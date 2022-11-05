import dbConnect from "../../../utils/DbConnent"
import userModel from "../../../utils/models/user"
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    const { method, body } = req

    dbConnect()

    switch (method) {
        case "POST":
            console.log(body)
            userModel.create({
                displayName: body.login,
                name: body.login,
                email: body.mail,
                password: await HashPassword(body.password)
            }).then(result => {
                res.status(204).send({text: 'User added successfully'})
            }).catch(err => {
                console.log(err)
                if (err.code === 11000) {
                    res.status(400).send({code: 1, type: "duplicate", errorRow: Object.keys(err.keyPattern)[0]})
                }
                res.status(400).send({code: 2, type: "unknown error"})
            })
            break;
        default:
            break;
    }
}

const HashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}