import dbConnect from "../../../../utils/DbConnent"
import listModel from "../../../../utils/models/list"
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import { verifyToken } from "../../auth"
import { NextApiRequest, NextApiResponse } from "next"


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
        let result = jwt.verify(token, 'req')
        if (typeof result !== 'string') {
            return result.id
        }
        return false
    } catch (e) {
        return false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query, headers } = req

    await dbConnect()
    
    switch (method) {
        case 'HEAD':
            try {
                let tokenData = verifyToken(query.token as string)
                if (tokenData.isExpired) {
                    res.status(401).send({})
                    break;
                }
                else {
                    let result = await listModel.findById(query.id)

                    if (result.users.findIndex(user => new ObjectId(tokenData.id).equals(user._id)) < 0) {
                        res.status(401).send({})
                        break
                    }

                    console.log('dupa')
                    console.log(result)
                    if (!result) {
                        res.status(404).send({})
                        break;
                    }
                    res.status(200).send({})
                    break
                }

            } catch (error) {
                console.log(error)
                res.status(404).send({})
            }
            break;
        case "GET":
            try {
                // Weryfikacja tokena zaproszenia
                let id = verifyId(query.id)
                if (!id) {
                    res.status(404).send({ message: 'List Not Found' })
                    break;
                }
                let result = await listModel.findById(id)
                res.status(200).send({ list: result })
                break;
            } catch (e) {
                console.log(e)
                res.status(404).send({ 'text': 'Error' })
                break;
            }
        case "DELETE":
            let tokenData = verifyToken(query.token as string)
            if (tokenData.isExpired) {
                res.status(401).send({ message: 'Token expired' })
                break;
            }

            let result = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id }, 'users')
            let idObj = new ObjectId(tokenData.id)
            if (!result.users.find(user => idObj.equals(user._id)).isAdmin) {
                res.status(401).send({ message: 'User Is Not Admin' })
                break
            }

            await listModel.findOneAndDelete({ _id: query.id, 'users._id': tokenData.id })

            let lists = await listModel.find({ 'users._id': tokenData.id.toString() })
            res.status(200).send({ lists: lists, text: 'Deleted successfully' })
            break;
    }
}

