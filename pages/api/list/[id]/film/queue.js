import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"
import { getFilms } from "./index"


export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    let result = {}
    switch (method) {
        case "GET":
            result = await listModel.findById(query.id)
            result = await getFilms(result.queue, query.language)
            res.send(result)
            break;
        case "POST":
            await listModel.findByIdAndUpdate(query.id, {
                $push: {
                    queue: body.film
                }
            })
            result = await listModel.findById(query.id, 'queue')
            console.log(query)
            result = await getFilms(result.queue, query.language)

            console.log(result)
            res.send(result)
            break;
        case "DELETE": 
        await listModel.updateOne({'_id': query.id}, {
            $pull: {
                'queue': { '_id': query.filmId }
            }
        })
        result = await listModel.findById(query.id)
        result = await getFilms(result.queue, query.language)
        res.send(result)
    }
}