const jwt = require('jsonwebtoken');

const JwtMiddleware = (req, res, next) => {
  const accessToken = req.headers['authorization']?.split(' ')[1];

  if (!accessToken) {
    console.log('access token 없음');

    return res.status(401).json({ message: 'access token 없음' });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({ message: 'access token이 유효하지 않습니다.' });
  }
};

module.exports = {
  JwtMiddleware,
};
