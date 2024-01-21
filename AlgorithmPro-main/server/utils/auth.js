const jwt = require('jsonwebtoken');

// we set the token with a secret and a expiration time

const secret = "turn-this-into-dotenv"
const expiration = "3h";

module.exports = {
authMiddleware:function ({req}){
     let token = req.body.token || req.query.token || req.headers.authorization;

    //this will cut of the bearer thats placed on the tokens

    if(req.headers.authorization){
         token = token.split(' ').pop().trim(); 
    }
    if(!token){
        return req
    }
try {
    const {data} = jwt.verify(token,secret,{maxAge: expiration});
    req.user = data;
} catch (error) {
    console.log('Invalid token')
    return req 
}
return req;
},
signToken:function ({username, email, _id}){
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
},
};