import jwt from 'jsonwebtoken';

const checkAuth = (token) => {
  if (token) {
    const parseToken = token.split(' ')[1];
    try {
      const decodedToken = jwt.verify(parseToken, process.env.SECRET);
      return { user: decodedToken.user, role: decodedToken.role };
    } catch (err) {
      return null;
    }
  }
};

export default checkAuth;
