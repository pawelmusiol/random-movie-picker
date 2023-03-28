import dbConnect from "../../../utils/DbConnent"
import userModel from "../../../utils/models/user"
import listModel from "../../../utils/models/list"
import { verifyToken } from "../auth"

export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()
    let tokenData

    switch (method) {
        case "POST":
            try {
                tokenData = verifyToken(query.token)
                if (tokenData.isExpired) {
                    res.status(401).send({ message: "Token expired" })
                    break
                }
                let user = await userModel.findOne({ _id: tokenData.id })
                console.log(user)
                if (user === null) {
                    res.status(404).send({ message: "User not found" })
                    break
                }
                let listData = {
                    name: body.name,
                    private: body.private,
                    users: [{
                        name: user.name,
                        _id: user._id,
                        isAdmin: true,
                        isOwner: true,
                    }],
                    requests: [],
                    films: [],
                }
                console.log(listData)
                let currentList = await listModel.insertMany(listData)
                console.log(currentList)
                const Lists = await listModel.find({ 'users._id': body.userId }).sort([['_id', -1]])
                res.status(201).send({ lists: Lists, text: 'List Created', currentListId: currentList[0]._id })
            } catch (err) {
                console.log(err)
                if (err.code === 11000) {
                    res.status(409).send({ text: 'List With This Name Already Exists' })
                    break
                }
                res.status(500).send({ text: 'Unexpected Error Ocured' })

            }
            break;
        case "GET":
            //dodać listy do profilu bez tokena i prywatnych
            //dodać listy wszystkie z tokenem i prywatnymi
            tokenData = verifyToken(query.token)
            try {
                if (tokenData.expired) {
                    res.status(401).send({ message: "Token expired" })
                    break
                }

                let lists = await listModel.find({ 'users._id': tokenData.id }).sort([['_id', -1]])
                res.status(200).send({ lists: lists })
                break;
            } catch (err) {
                res.status(500).send({ text: 'Unexpected Error Ocured' })
            }
        default:
            break;
    }
}