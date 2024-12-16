import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized user" });
    }

    const token = authHeader.split(" ")[1];
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded_token.id;
    // console.log("User ID from token:", decoded_token.id); // Log for debugging
    next();
  } catch (error) {
    console.error("User authentication error:", error.message);
    return res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

export default userAuth