import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"
import { verifyToken } from "../../../auth"


export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    switch (method) {
        case "DELETE":
            try {
                const tokenData = verifyToken(query.token)
                console.log(tokenData)
                if (!tokenData.isExpierd) {
                    let deleteResult = await listModel.updateOne({ '_id': query.id, 'users._id': tokenData.id }, {
                        $pull: {
                            'films': { '_id': query.filmId }
                        }
                    })
                    let result = await listModel.findById(query.id)
                    res.status(200).send(result)
                }
                else {
                    res.status(401).send({ message: 'Not Authorized' })    
                }
            } catch (error) {
                res.status(401).send({ message: 'Not Authorized' })
            }
            break;
    }
}