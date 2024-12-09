import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        
        const authHeader  = req.headers.authorization;        
        
        if(!authHeader || !authHeader.startsWith("Bearer ")) return res.json({ sucess:false, message: "not authorized admin"});
        
        const token = authHeader.split(" ")[1];

        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({ sucess:false, message: "not authorized admin"});
        }

        req.admin = decoded_token;
        next();
    } catch (error) {
        console.error(error);
        return res.json({ sucess:false, message: "something went wrong", error: error.message});
    }
}

export default adminAuth