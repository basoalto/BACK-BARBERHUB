const  jwt =  require('jsonwebtoken')
const configService = require("../firebase/config")
const dotenv = require('dotenv');

const createJwt = (payload) => {
    const key = process.env.JWT_SECRET
    return { accesToken: jwt.sign(payload,  'b68ed87fe43cf0dbb17f0da5c3070fe6336d2ad394f1eb1ae58fe3db38d8fc1c', { expiresIn: '1h' })}
}
const verifyJwt = (token) => {
    console.log('token', token)
    return jwt.verify(token, configService.get());
}
const decodeJwt = (token) => {
    return jwt.decode(token);
}


module.exports ={createJwt, verifyJwt, decodeJwt}
