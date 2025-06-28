import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Bank from "../models/bankModel.js";
import asyncHandler from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"; // Ensure this import is correct

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new ErrorHandler(
        "User not found. Login first to access this resource.",
        401
      )
    );
  }
  req.user = user;
  next();
});

export const authorizePplOnly = (...roles) => {
  return (req, res, next) => {

    if((!req.user)){
      return next(new ErrorHandler("Login first to access this resource.", 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

export const isAuthenticatedBank =  asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if(!token){
    return next(new ErrorHandler('Login first to access this resource.',401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.bank = await Bank.findById(decoded.id);

  if(!req.bank){
    return next(new ErrorHandler('Bank not found. Login first to access this resource.',401));
  }

  next();
});

export const isAuthenticatedBankOrAdmin = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    console.log('No token found in cookies or Authorization header');
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    return next(new ErrorHandler('Invalid or expired token.', 401));
  }

  // Try to find a bank
  const bank = await Bank.findById(decoded.id);
  if (bank) {
    console.log('Authenticated as bank:', bank.email || bank._id);
    req.bank = bank;
    return next();
  }

  // Try to find an admin user
  const user = await User.findById(decoded.id);
  if (user && user.role === "Admin") {
    console.log('Authenticated as admin:', user.email || user._id);
    req.user = user;
    return next();
  }

  console.log('No bank or admin found for decoded id:', decoded.id);
  return next(new ErrorHandler('Bank or Admin not found. Login first to access this resource.', 401));
}); 
