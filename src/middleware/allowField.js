

const allowFields = (allowedFields) => {

    return (req, res, next) => {
        const updates = Object.keys(req.body)

        const isValidOperation = updates.every(field => allowedFields.includes(field))

        if(!isValidOperation){
            return res.status(400).json({
                message: "invalid fields in request"
            })
        }

        next()
    }
}


module.exports = allowFields