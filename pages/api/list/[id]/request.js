import dbConnect from "../../../../utils/DbConnent"
import userModel from "../../../../utils/models/user"
import listModel from "../../../../utils/models/list"
import jwt from 'jsonwebtoken'
import { verifyToken } from "../../auth"
export default async function handler(req, res) {
    const { method, body, params, query } = req

    await dbConnect()

    switch (method) {
        case "POST":
            try {

            } catch (err) {

            }
        case "GET":
            const tokenData = verifyToken(query.token)
            if (tokenData.isExpired) {
                res.status(401).send({ message: "Token expired" })
                break
            }

            let list = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id })
            if (list === null) {
                res.status(401).send({ message: 'List Isn\'t connected with this account' })
                break
            }

            let requestToken = await createToken(query.id)
            res.status(200).send({ token: requestToken, text: 'Token Generated' })
            break;
        default:
            break;
    }
}

const createToken = async (id) => {
    return jwt.sign({ id: id, exp: Math.floor(Date.now() + (1000 * 60 * 60)) }, 'req')
}

const decodeToken = async (token) => {

}