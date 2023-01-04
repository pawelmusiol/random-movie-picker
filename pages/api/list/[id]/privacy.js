import dbConnect from "../../../../utils/DbConnent"
import userModel from "../../../../utils/models/user"
import listModel from "../../../../utils/models/list"

export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "PUT":
            try {
                let x = await listModel.updateOne({ '_id': query.id }, {
                    private: !body.privacy
                })
                
                let lists = await listModel.find({ 'users._id': body.userId }).sort([['_id', -1]])
                res.status(200).send({ lists: lists })

            }
            catch (e) {
                console.error(e)
             }
        case "GET":

            break;
        default:
            break;
    }
}