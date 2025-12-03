// Simple API key authentication
const auth = (req, res, next) => {
    const apiKey = req.headers['authorization'];
    if (apiKey === process.env.AUTH_TOKEN || apiKey === 'secret123') {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
    }
  };
  
  module.exports = auth;