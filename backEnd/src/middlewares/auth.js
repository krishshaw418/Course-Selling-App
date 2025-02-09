const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.TOKEN_SECRET;

const Auth = async(req, res, next) => {
    const token = req.cookies.sessionId;
    if(!token){
        return res.json({error:`Access Denied!`});
    }
    jwt.verify(token, secret, (err, decoded)=>{
        if(err){
            return res.json({error:`Invalid Credentials!`});
        }
        req.userId = decoded;
        next();
    })
}

module.exports = {Auth};