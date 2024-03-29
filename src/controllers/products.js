import path from 'path'
import fs from 'fs'
import formidable from 'formidable-serverless'
import ProductsModel from '../models/products'
import dbConnect from '../utils/dbConnect'

const post = async (req, res) => {
    await dbConnect()

    const form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: "public/uploads",
        keepExtensions: true,
    })

    form.parse(req, async (error, fields, data) => {
        if (error) {
            return res.status(500).json({success: false})
        }

        //rename file
        const { files } = data

        const filesToRename = files instanceof Array
            ? files
            : [files]

            const filesToSave = []

            filesToRename.forEach(file => {
                const timestamp = Date.now()
                const random = Math.floor(Math.random() * 9999999) + 1

                const extension = path.extname(file.name) // .png ou .jpg ou ...
                const filename = `${timestamp}_${random}${extension}`

                const oldPath = path.join(__dirname, `../../../../../${file.path}`)
                const newPath = path.join(__dirname, `../../../../../${form.uploadDir}/${filename}`)


                filesToSave.push({
                    name: filename,
                    path: newPath,
                })

                fs.rename(oldPath, newPath, () => {
                    if (error) {
                        console.log(error)
                        return res.status(500).json({success: true})

                    }
                })

            })
            // 

            function dateFormat(){
                var data = new Date(),
                    dia  = data.getDate().toString(),
                    diaF = (dia.length == 1) ? '0'+dia : dia,
                    mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                    mesF = (mes.length == 1) ? '0'+mes : mes,
                    anoF = data.getFullYear();
                return diaF+"/"+mesF+"/"+anoF;
            }

            const {
                title,
                category,
                description,
                price,
                name,
                email,
                phone,
                userId,
                image,
            } = fields

            const product = new ProductsModel({
                title,
                category,
                description,
                price,
                user: {
                    id: userId,
                    name,
                    email,
                    phone,  
                    image,
                },      
                date: dateFormat(),
                // email,
                // phone,         
                files: filesToSave,
            })

            const register = await product.save()
           
            if (register) {
                res.status(201).json({success: true})
            } else {
                res.status(500).json({success: false})                
            }
    })
}

const remove = async (req, res) => {
    await dbConnect()

    const id = req.body.id

    const deleted = await ProductsModel.findOneAndRemove({_id: id})

    if (deleted) {
        return res.status(200).json({ success: true })
    } else {
        return res.status(500).json({ success: false })
    }
}


export {
    post,
    remove
}
