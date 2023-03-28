import axios from 'axios'
import dbConnect from "../../../../../utils/DbConnent"
import userModel from "../../../../../utils/models/user"
import bcrypt from 'bcrypt'
import { verifyToken } from '../../../auth'

export default async function handler(req, res) {
    const { method, query, body } = req

    dbConnect()

    switch (method) {
        case "GET":
            try {
                let data = {
                    //userProviders: await getUserProviders(query.id),
                    availableProviders: await getProviders(query.language)
                }
                res.status(200).send(data)

            } catch (error) {
                res.status(500).send({ message: 'Something Went Wrong' })
            }
            break;
        case "POST":
            let tokenData = verifyToken(query.token)
            if (tokenData.isExpired) {
                res.status(401).send({ message: 'Token expired' })
                break
            }
            try {
                await addProvider(query.id, body.provider)
                let result = await userModel.findById(query.id)
                res.status(201).send(result)
            } catch (err) {
                res.status(500).send({ message: 'Something Went Wrong' })
            }
            break;
        default:
            break;
    }
}

const addProvider = async (id, provider) => {
    let result = await userModel.findByIdAndUpdate(
        id,
        { $addToSet: { providers: provider } }
    )
    return result;
}

const getUserProviders = async (id) => {
    let userProviders = await userModel.findById(id, 'providers')
    return userProviders.providers
}

const getProviders = async (language) => {

    let providersTv = (await axios.get(`https://api.themoviedb.org/3/watch/providers/tv?api_key=${process.env.TMDB_API_KEY}&watch_region=${language.slice(3, 5)}`)).data
    let providersMovie = (await axios.get(`https://api.themoviedb.org/3/watch/providers/movie?api_key=${process.env.TMDB_API_KEY}&watch_region=${language.slice(3, 5)}`)).data



    providersTv.results.forEach(provider => {
        let index = providersMovie.results.findIndex(sp => sp.provider_id === provider.provider_id)
        if (index === -1) providersMovie.results.push(provider)
    });

    return providersMovie.results.map(provider => {
        return {
            logoPath: provider.logo_path,
            id: provider.provider_id,
            name: provider.provider_name
        }
    })

}