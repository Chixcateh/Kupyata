import jwt from "jsonwebtoken";

export const generateToken=(userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token, {
        maxAge: 7*24*60*1000,//MS
        httpOnly: true,//prevent XSS attacks cross_site scripting attacks
        sameSite: "Lax",//CSRF attacks cross-site request forgery attacks
        secure:false,
        //secure: process.env.NODE_ENV !=="development"
    })

    return token;
}