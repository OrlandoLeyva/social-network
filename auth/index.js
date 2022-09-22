const jwt = require('jsonwebtoken');
const { environment } = require('../environment/environment.config');
const bcrypt = require('bcrypt'); 

//Token section start
function sign(payload){
   return jwt.sign(payload, environment.jwtSecret);
}

function verify(token){
    try {
        const payload = jwt.verify(token, environment.jwtSecret);
        return payload
    } catch (error) {
        throw new Error('Permission denied');
    }
}


function getToken(auth){
    if(!auth.startsWith('Bearer ')) throw new Error('Incorrect format');
    return auth.replace('Bearer ','');
}

function decodeToken(auth){
    const token = getToken(auth);
    try {
        const payload = verify(token);
        return payload;
    } catch (error) {
        throw new Error(error.message);
    }
}
//Token section end.

//Password section start.
async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, 5);
    return hashedPassword;
}

function verifyPassword(password, hashedPassword){
    const result = bcrypt.compare(password, hashedPassword);
    return result;
}

module.exports = {
    sign,
    verify,
    decodeToken,
    hashPassword,
    verifyPassword
}