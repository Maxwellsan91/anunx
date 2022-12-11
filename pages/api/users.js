import dbConnect from "../../src/utils/dbConnect"

const users = async (req, res) => {
    const { method } = req

    switch(method) {
        case 'GET':
            //connected
            await dbConnect() 
            //run
            res.status(200).json({ success: true })
            break
    }
}

export default users