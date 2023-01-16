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
                res.status(200).send({ token: token, text: "Logged in successfully", name: userData.name, id: user._id, providers: userData.providers })
            }
            else {
                res.status(401).send({ text: "Invalid Password" })
            }
            break;
        case 'GET':
            console.log(query)
            try {
                let verifiedToken = jwt.verify(query.token, 'dupa')
                console.log(verifiedToken)
                if (Date.now() > verifiedToken.exp) {
                    res.status(401).send({ text: "Token Expired", code: 4 })
                }
                else if (Date.now() < verifiedToken.exp) {
                    let data = (await getUserData(verifiedToken.id))
                    res.status(200).send({ text: "Token Active", code: 1, name: data.name, id: verifiedToken.id, providers: data.providers })
                }
            } catch (error) {
                console.log(error)
                res.status(401).send({ text: "Not Logged" })
            }
            break;
    }
}

const getUserData = async (id) => {
    return await userModel.findById(id, 'name providers')
}

const getPassword = async (name) => {
    return await userModel.findOne({ name: name }, 'password')
}

const CheckPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

export default handler