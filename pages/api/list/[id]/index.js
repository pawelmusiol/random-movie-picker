import dbConnect from "../../../../utils/DbConnent"
import listModel from "../../../../utils/models/list"
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import { verifyToken } from "../../auth"

const ObjectId = Types.ObjectId

const verifyId = (id) => {
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id) === id))
            return id
        else return verifyListToken(id)
    }
    else return verifyListToken(id)
}

const verifyListToken = (token) => {
    try {
        return jwt.verify(token, 'req').id
    } catch (e) {
        return false
    }
}

export default async function handler(req, res) {
    const { method, body, query, headers } = req

    await dbConnect()
    let result = {}

    switch (method) {
        case "GET":
            try {
                // Weryfikacja tokena zaproszenia
                let id = verifyId(query.id)
                if (!id) {
                    res.status(404).send({ message: 'List Not Found' })
                    break;
                }
                result = await listModel.findById(id)
                res.status(200).send({ list: result })
                break;
            } catch (e) {
                console.log(e)
                res.status(404).send({ 'text': 'Error' })
                break;
            }
        case "DELETE":
            let tokenData = verifyToken(query.token)
            if (tokenData.isExpired) {
                res.status(401).send({ message: 'Token expired' })
                break;
            }

            result = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id }, 'users')
            let idObj = new ObjectId(tokenData.id)
            if(!result.users.find(user => idObj.equals(user._id)).isAdmin){
                res.status(401).send({ message: 'User Is Not Admin' })
                break
            }
            
            await listModel.findOneAndDelete({ _id: query.id, 'users._id': tokenData.id })

            let lists = await listModel.find({ 'users._id': tokenData.id.toString() })
            res.status(200).send({ lists: lists, text: 'Deleted successfully' })
            break;
    }
}

