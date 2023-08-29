//que verifica si el correo ya se encuentra ingresado al momento de registrarse un nuevo usuario

const jwt = require('jsonwebtoken')

const key = require('../config/auth.config')

function auth_require (req, res, next) {

    const { authorization } = req.headers

    try {
        const decoded = jwt.verify(authorization, key.secret_key)
        
        const actualTime = ( new Date() / 1000 )

        if(actualTime > decoded.exp) {
            return res.status(401).json({error: 'Token expirado'})
        }

        req.data = decoded.data
        
    } catch (error) {
       
        return res.status(401).json(error)
    }

    next()
}

module.exports = {auth_require}