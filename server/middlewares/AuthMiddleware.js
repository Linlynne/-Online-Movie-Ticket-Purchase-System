const {verify} = require('jsonwebtoken');

const validateTaken = (req,res,next) => {
    const accessToken = req.header('accessToken');
    
    if(!accessToken){
        return res.json({error: "User not logged in"});
    }else{
        try{
            const validToken = verify(accessToken,"importantsecret");
            req.user = validToken;
            if(validToken){
                return next();
            }
        }catch(err){
            return res.json({error: err});
        }
    }
};

module.exports = {validateTaken};