import axios from 'axios'
import dbConnect from "../../../../../utils/DbConnent"
import userModel from "../../../../../utils/models/user"
import { verifyToken } from '../../../auth'

export default async function handler(req, res) {
    const { method, query, body } = req

    dbConnect()

    switch (method) {
        case "DELETE":
            try {
                let tokenData = verifyToken(query.token)

                if (tokenData.isExpired) {
                    res.stetus(401).send({ message: 'Token expired' })
                    break
                }

                if (tokenData.id !== query.id) {
                    res.status(401).send({ message: 'Not Authorized' })
                    break
                }
                await userModel.updateOne({ _id: query.id },{
                    $pull: {
                        providers: query.providerId,
                    }
                })
                let result = await userModel.findOne({ _id: query.id}, 'providers')
                console.log('dupa')
                console.log(result)

                res.status(200).send({providers: result.providers})

            } catch (err) {
                console.log(err)
                res.status(500).send({ message: 'Something Went Wrong' })
            }
            break;

        default:
            break;
    }
}
