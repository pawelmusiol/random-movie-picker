import dbConnect from "../../../utils/DbConnent"
import userModel from "../../../utils/models/user"
import listModel from "../../../utils/models/list"

export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "POST":
            try {
                console.log(body)
                let user = await userModel.findById(body.userId)
                console.log(user)
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
                let currentList = await listModel.insertMany(listData)
                console.log(currentList)
                const Lists = await listModel.find({ 'users._id': body.userId }).sort([['_id', -1]])
                res.status(201).send({ lists: Lists, text: 'List Created', currentListId: currentList[0]._id })
            } catch (err) {
                res.status(500).send({ text: 'Unexpected Error Ocured' })
            }
            break;
        case "GET":
            let lists = await listModel.find({ 'users._id': query.userid }).sort([['_id', -1]])
            res.status(200).send({ lists: lists })
            break;
        default:
            break;
    }
}