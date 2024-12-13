import jwt from 'jsonwebtoken'

const docAuth = (req,res,next) => {
    try {
        const docToken = req.headers.authorization

        if(!docToken || !docToken.startsWith('Bearer ') ){
            return res.json({success:false, message:'not authorized doctor'});
        }

        const token = docToken.split(" ")[1];
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        req.body.docId = decoded_token.id;
        next();
    } catch (error) {
        console.log('error during authenticate the doctor');
        return res.json({success:false,meessage:'error during authenticate the doctor '+error.meessage});
    }
}

export default docAuth