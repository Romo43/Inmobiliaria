import Estate from '../models/Estate'

export const home = async (req, res) =>{
    res.status(200).json('We are AxioWeb')
}
export const allEstates = async (req, res) =>{
    const data = await Estate.find().lean()
    res.status(200).json(data)
}
export const error404 = async (req, res) =>{
    res.status(200).json('Oops! page not found 404')
}
