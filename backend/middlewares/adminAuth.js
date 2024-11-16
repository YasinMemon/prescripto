import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        
        const { atoken } = req.headers
        
        if(!atoken) return res.json({ sucess:false, message: "not authorized admin"});
        
        const decoded_token = jwt.verify(atoken, process.env.JWT_SECRET);

        if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({ sucess:false, message: "not authorized admin"});
        }

        next();
    } catch (error) {
        console.error(error);
        return res.json({ sucess:false, message: "something went wrong", error: error.message});
    }
}

export default adminAuth