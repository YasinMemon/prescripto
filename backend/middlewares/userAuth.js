import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not authorized user" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token part
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded_token.id;
    next();
  } catch (error) {
    console.log("user authentication error ", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
