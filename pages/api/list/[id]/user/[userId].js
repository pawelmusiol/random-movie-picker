import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"
import userModel from "../../../../../utils/models/user"
import { Types } from "mongoose"

const ObjectId = Types.ObjectId

export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {

        case "POST":
        try {    
        let user = await userModel.findById(query.userId)
        console.log(user)
            let result = await listModel.updateOne({ _id: query.id }, {
                $addToSet: {
                    'users': {
                        _id: new ObjectId(user._id),
                        name: user.name,
                        isOwner: false,
                        isAdmin: false,
                    }
                }
            })
            res.status(201).send({ text: 'User added successfully'})
        } catch (err) {
            res.status(500).send({ text: 'Unexpected error' })
        }
            break;
        case "DELETE":
            break;
    }
}