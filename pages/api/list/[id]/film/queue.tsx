import axios from "axios"
import dbConnect from "../../../../../utils/DbConnent"
import listModel from "../../../../../utils/models/list"
import { verifyToken } from "../../../auth"
import { getFilms } from "./index"
import { NextApiRequest, NextApiResponse } from "next"



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query } = req

    await dbConnect()

    let result = {
        queue: []
    }
    let finalData: IFinalFilmData[] | [] = []
    let tokenData = verifyToken(query.token as string)
    switch (method) {
        case "GET":
            if (tokenData.isExpired) {
                res.status(401).send('Token Expired')
                break;
            }

            result = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id }, 'queue')

            console.log(result)
            if (!result.queue.length) {
                res.status(204).send({})
                break
            }

            finalData = await getFilms(result.queue, query.language as string)
            res.status(200).send(finalData)
            break;
        case "POST":

            if (tokenData.isExpired) {
                res.status(401).send({ message: 'Token Expired' })
            }

            await listModel.findOneAndUpdate({ _id: query.id, 'users._id': tokenData.id }, {
                $push: {
                    queue: body.film
                }
            })
            result = await listModel.findOne({ _id: query.id, 'users._id': tokenData.id }, 'queue')

            if (!result.queue.length) {
                res.status(500).send({ message: 'something went wrong' })
            }

            finalData = await getFilms(result.queue, query.language as string)

            res.status(201).send(finalData)
            break;
        case "DELETE":
            if (tokenData.isExpired) {
                res.status(401).send({ message: 'Token Expired' })
                break;
            }

            await listModel.updateOne({ '_id': query.id, 'users._id': tokenData.id }, {
                $pull: {
                    'queue': { '_id': query.filmId }
                }
            })
            result = await listModel.findById(query.id)
            finalData = await getFilms(result.queue, query.language as string)
            res.status(200).send(finalData)
    }
}