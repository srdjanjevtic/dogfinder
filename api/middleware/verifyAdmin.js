import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  jwt.verify(
    req.cookies.token,
    process.env.JWT_SECRET_KEY,
    async (err, payload) => {
      if (err) return res.status(403).json({ message: "Doslo je do greske!" });
      req.userId = payload.id;
      if (req.userId !== process.env.ADMIN_ID)
        return res.status(403).json({ message: "Nedozvoljeno!" });
      next();
    }
  );
};
