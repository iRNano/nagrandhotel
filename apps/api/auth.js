const jwt = require("jsonwebtoken")
const User = require("./models/User")
const jwtSecret = process.env.JWT_SECRET

exports.isAdmin = (req, res, next) => {
    let token = req.headers["x-auth-token"]
    if (!jwtSecret) {
        return res.status(500).json({
            status: 500,
            message: "JWT_SECRET is not configured"
        })
    }
    if(token){
        jwt.verify(token, jwtSecret, (err,decoded)=>{
            if (err || !decoded) {
                return res.status(401).json({
                    status: 401,
                    message: "Invalid token"
                })
            }
            if(decoded.isAdmin === false) return res.status(401).json({
                status:401,
                message: "Unauthorized"
            })
            next()
        })
    }else{
        return res.status(400).json({status:400, message: "Please log in"})
    }
    
}

