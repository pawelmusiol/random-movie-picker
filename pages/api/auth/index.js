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
            console.log(user)
            if (!user) {
                res.status(401).send({ text: "Invalid Login" })
                break
            }
            if (await CheckPassword(body.password, user.password)) {
                let token = jwt.sign({ id: user._id, exp: Math.floor(Date.now() + (1000 * 60 * 60)) }, 'dupa',)
                res.status(200).send({ token: token, text: "Logged in successfully", name: body.login, id: user._id })
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
                else if(Date.now() < verifiedToken.exp){
                    let name = (await getName(verifiedToken.id)).name
                    res.status(200).send({text: "Token Active", code: 1, name: name, id: verifiedToken.id })
                }
            } catch (error) {
                console.log(error)
                res.status(401).send({ text: "Not Logged" })
            }
            break;
        }
}

const getName = async (id) => {
    return await userModel.findById(id, 'name')
}

const getPassword = async (name) => {
    return await userModel.findOne({ name: name }, 'password')
}

const CheckPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

export default handler