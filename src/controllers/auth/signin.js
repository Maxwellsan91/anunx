import { compare } from "../../utils/password"
import UsersModel from "../../models/users"
import dbConnect from "../../utils/dbConnect"

const post = async (req, res) => {
    const {
        email,
        password,
    } = req.body

    await dbConnect()

    const user = await UsersModel.findOne({ email })

    if (!user){
        return res.status(401).json({success: false, message: 'invalid'}) //usuário não existe
    }

    const passIsCorrect = compare(password, user.password)

    if (passIsCorrect) {
        return res.status(200).json({ 
            _id: user.id,
            name: user.name,
            email: user.email,
         })
    }
    return res.status(401).json({success: false, message: 'invalid'})
}

export {
    post,
}