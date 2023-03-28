import dbConnect from "../../../../utils/DbConnent"
import userModel from "../../../../utils/models/user"
import listModel from "../../../../utils/models/list"
import { verifyToken } from "../../auth"
import { Types } from 'mongoose'

const ObjectId = Types.ObjectId

export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "PUT":
            try {
                let tokenData = verifyToken(query.token)
                if (tokenData.isExpired) {
                    res.status(401).send({ message: 'Token expired' })
                    break
                }

                let result = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id }, 'users')
                let idObj = new ObjectId(tokenData.id)
                if (!result.users.find(user => idObj.equals(user._id)).isAdmin) {
                    res.status(401).send({ message: 'User Is Not Owner' })
                    break
                }

                let x = await listModel.updateOne({ '_id': query.id }, {
                    private: !body.privacy
                })

                let lists = await listModel.find({ 'users._id': body.userId }).sort([['_id', -1]])
                res.status(200).send({ lists: lists })

            }
            catch (e) {
                console.error(e)
                res.status(500).send({ message: 'something went wrong' })
            }
        case "GET":

            break;
        default:
            break;
    }
}