import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"


export default async function handler(req, res) {
    const { method, body, query } = req

    dbConnect()

    switch (method) {
        case "DELETE":
            let deleteResult = await listModel.updateOne({'_id': query.id}, {
                $pull: {
                    'films': { '_id': query.filmId }
                }
            })

            let result = await listModel.findById(query.id)
            res.send(result)
        break;
    }
}