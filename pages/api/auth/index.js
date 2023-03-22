import dbConnect from "../../../utils/DbConnent"
import userModel from "../../../utils/models/user"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            const user = await getPassword(body.login)
            if (!user) {
                res.status(401).send({ text: "Invalid Login" })
                break
            }
            if (await CheckPassword(body.password, user.password)) {
                let userData = await getUserData(user._id)
                console.log(userData)
                let token = jwt.sign({ id: user._id, exp: Math.floor(Date.now() + (1000 * 60 * 60)) }, 'dupa',)
                res.status(200).send({ token: token, text: "Logged in successfully", name: userData.name, id: user._id, providers: userData.providers, favourite: userData.favourite })
            }
            else {
                res.status(401).send({ text: "Invalid Password" })
            }
            break;
        case 'GET':
            console.log(query)
            try {
                let verifiedToken = verifyToken(query.token)
                console.log(verifiedToken)
                if (verifiedToken.isExpired) {
                    res.status(401).send({ text: "Token Expired", code: 4 })
                }
                else if (!verifiedToken.isExpired) {
                    let data = (await getUserData(verifiedToken.id))
                    console.log(data)
                    res.status(200).send({ text: "Token Active", name: data.name, id: verifiedToken.id, providers: data.providers, favourite: data.favourite })
                }
            } catch (error) {
                console.log(error)
                res.status(401).send({ text: "Not Logged" })
            }
            break;
    }
}

export const verifyToken = (token) => {
    try {
        let tokenData = jwt.verify(token, 'dupa')
        return {
            ...tokenData,
            isExpired: Date.now() > tokenData.exp,
        }
    } catch (error) {
        return {
            isExpired: true,
        }
    }
}

const getUserData = async (id) => {
    return await userModel.findById(id, 'name providers favourite')

}

const getPassword = async (name) => {
    return await userModel.findOne({ name: name }, 'password')
}

const CheckPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

export default handler