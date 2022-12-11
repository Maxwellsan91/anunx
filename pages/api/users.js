import dbConnect from "../../src/utils/dbConnect"
import { crypto } from "../../src/utils/password"
import UsersModel from "../../src/models/users"

const users = async (req, res) => {
    const { method } = req

    switch(method) {
        case 'GET':
            //connected
            await dbConnect() 
            //run
            res.status(200).json({ success: true })
            break

            case 'POST':
                //pegar dados que vem no req
                //conectar no BD
                //criptografar senha
                //salvar os dados
                //responder sucesso
                const {
                    name,
                    email,
                    password,
                } = req.body

                await dbConnect()

                const passwordCrypto = await crypto(password)

                const user = new UsersModel({
                    name,
                    email,
                    password: passwordCrypto,
                })

                user.save()

                res.status(201).json({ success: true })
    }
}   

export default users