// import Employee from "../models/User.js"

// export const login = async (req, res) =>{
//     const { email, password } = req.body
//     try {
//         const user = await Employee.find({email: email, password: password})
//         if (!user) {
//             res.status(404).json({message: "This user do not exist"})
//         }
//         res.status(200).json(user)
//     } catch (err) {
//         res.status(500).json({message: err.message})
//     }
// }