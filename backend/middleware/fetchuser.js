const jwt = require('jsonwebtoken')
const SECERT_SIGN='hellothere'


const  fetchuser =async (req,res,next)=>{
    const token = await req.header('auth-token')
    if (!token) {
        res.status(401).send({error: 'please autheticate correct credential'})   
    }
    try {
        const data = jwt.verify(token,SECERT_SIGN);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error: 'please autheticate correct credential'}) 
    }
}

module.exports = fetchuser;