import dbConnect from "../../../../utils/DbConnent"
import listModel from "../../../../utils/models/list"
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'

const ObjectId = Types.ObjectId

const verifyId = (id) => {
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id) === id))
            return id
        else return verifyToken(id)
    }
    else return verifyToken(id)
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, 'req').id
    } catch (e) {
        return false
    }
}

export default async function handler(req, res) {
    const { method, body, query, headers } = req

    dbConnect()
    let result = {}

    switch (method) {
        case "GET":
            try {
                let id = verifyId(query.id)
                result = await listModel.findById(id)
                res.status(200).send({ list: result })
            } catch (e) {
                console.log(e)
                res.status(404).send({'text': 'Error'})
            }
            break;
        case "DELETE":
            result = await listModel.findByIdAndDelete(query.id)
            let lists = await listModel.find({ 'users._id': headers.userid })
            console.log(result)
            res.status(200).send({ lists: lists, text: 'Deleted successfully' })
            break;
    }
}

