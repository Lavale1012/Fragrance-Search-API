// export const authApiKey = async (req, res, next) => {
//   const apiKey = req.header("x-api-key");
//   if (!apiKey) {
//     return res.status(401).json({ message: "Api key is needed" });
//   }
//   try {
//     const user = await User.findOne({ apiKey });

//     if (!user) {
//       return res.status(403).json({ message: "Invalid API key" });
//       req.user = user;
//       next();
//     }
//   } catch (error) {
//     console.error("Error validating API key:", error);
//     res.status(500).json({ message: error.message });
//   }
// };
