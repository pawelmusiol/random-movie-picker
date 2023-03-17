import dbConnect from "../../../../utils/DbConnent"
import userModel from "../../../../utils/models/user"
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "POST":

            break;
        case "GET":
            try {
                let user = await userModel.findById(query.id)
                res.status(200).send({ name: user.displayName, image: user.image, email: user.email})
                break;
            } catch (err) {
                res.status(404).send({text: "User not found"})
            }
        default:
            break;
    }
}
