export const staff = (req, res, next) => {
  if (req.user && (req.user.role === 'staff' || req.user.role === 'admin')) {
    return next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied: Staff or Admin authorization required' });
  }
};
