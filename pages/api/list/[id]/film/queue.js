import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"
import { verifyToken } from "../../../auth"
import { getFilms } from "./index"


export default async function handler(req, res) {
    const { method, body, query } = req

    await dbConnect()

    let result = {}
    let tokenData = {}
    switch (method) {
        case "GET":
            tokenData = verifyToken(query.token)
            if (tokenData.isExpired) {
                res.status(401).send('Token Expired')
                break;
            }

            result = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id }, 'queue')

            console.log(result)
            if (!result.queue.length) {
                res.status(204).send()
                break
            }

            result = await getFilms(result.queue, query.language)
            res.status(200).send(result)
            break;
        case "POST":
            tokenData = verifyToken(query.token)

            if (tokenData.isExpired) {
                res.status(401).send({message: 'Token Expired'})
            }

            await listModel.findOneAndUpdate({ _id: query.id, 'users._id': tokenData.id }, {
                $push: {
                    queue: body.film
                }
            })
            result = await listModel.findOne({_id: query.id, 'users._id': tokenData.id }, 'queue')

            if (!result.queue.length) {
                res.status(500).send({message: 'something went wrong'})
            }

            result = await getFilms(result.queue, query.language)

            res.status(201).send(result)
            break;
        case "DELETE":
            tokenData = verifyToken(query.token)
            if(tokenData.isExpired){
                res.status(401).send({message: 'Token Expired'})
                break;
            }

            await listModel.updateOne({ '_id': query.id, 'users._id': tokenData.id }, {
                $pull: {
                    'queue': { '_id': query.filmId }
                }
            })
            result = await listModel.findById(query.id)
            result = await getFilms(result.queue, query.language)
            res.status(204).send(result)
    }
}