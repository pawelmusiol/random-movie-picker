import dbConnect from "../../../../utils/DbConnent"
import userModel from "../../../../utils/models/user"
import listModel from "../../../../utils/models/list"
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    const { method, body, params, query } = req

    await dbConnect()

    switch (method) {
        case "POST":
            try {

            } catch (err) {

            }
        case "GET":
            let token = await createToken(query.id)
            res.status(200).send({token: token, text: 'Token Generated'})
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