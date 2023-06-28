import dbConnect from "../../../../utils/DbConnent"
import userModel from "../../../../utils/models/user"
import { verifyToken } from "../../auth"
import { Types } from 'mongoose'
import { NextApiRequest, NextApiResponse } from "next"


const ObjectId = Types.ObjectId

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "POST":

            break;
        case "GET":
            try {
                let tokenData = verifyToken(query.token as string)
                if (tokenData.isExpired) {
                    res.status(401).send({ message: "Token expired" })
                    break
                }
                let user = await userModel.findById(query.id)
                let isOwner = new ObjectId(tokenData.id).equals(user._id)
                res.status(200).send({ name: user.displayName, image: user.image, email: user.email, isOwner: isOwner })
            } catch (err) {
                res.status(404).send({ text: "User not found" })
            }
            break
        default:
            break;
    }
}

