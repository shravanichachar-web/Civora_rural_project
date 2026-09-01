import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'civora_secret_key_2026', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};
