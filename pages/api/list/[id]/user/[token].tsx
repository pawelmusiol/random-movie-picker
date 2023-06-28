import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"
import userModel from "../../../../../utils/models/user"
import { Types } from "mongoose"
import { verifyToken } from "../../../auth"
import { NextApiRequest, NextApiResponse } from "next"


const ObjectId = Types.ObjectId

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {

        case "POST":
            try {
                let tokenData = verifyToken(query.token as string)

                if (tokenData.isExpired) {
                    res.status(401).send('Token expired')
                    break;
                }

                let user = await userModel.findById(tokenData.id)
                console.log(user)
                let checkForUser = await listModel.findOne({ _id: query.id, 'users._id': user._id })

                if(checkForUser){
                    res.status(406).send({message: 'You are already in this list'})
                    break
                }
                let result = await listModel.updateOne({ _id: query.id }, {
                    $addToSet: {
                        'users': {
                            _id: user._id.toString(),
                            name: user.name,
                            isOwner: false,
                            isAdmin: false,
                        }
                    }
                })
                res.status(201).send({ text: 'User added successfully' })
            } catch (err) {
                res.status(500).send({ text: 'Unexpected error' })
            }
            break;
        case "DELETE":
            break;
    }
}