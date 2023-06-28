import dbConnect from "../../../utils/DbConnent"
import userModel from "../../../utils/models/user"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req

    await dbConnect()

    switch (method) {
        case "POST":
            userModel.create({
                displayName: body.login,
                name: body.login,
                email: body.mail,
                password: await HashPassword(body.password)
            }).then(result => {
                res.status(204).send({ text: 'User added successfully' })
                return 0
            }).catch(err => {
                if (err.code === 11000) {
                    res.status(409).send({ code: 1, type: "duplicate", errorRow: Object.keys(err.keyPattern)[0] })
                    return 0
                }

                res.status(400).send({ code: 2, type: "unknown error" })
            })
            break;
        default:
            break;
    }
}

const HashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}