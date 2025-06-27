import express from 'express';
import {
  getAllUser,
  getUserdetails,
  updatetoadmin,
  deleteUserbyadmin,
  getAllBanks,
  getBankById,
  deleteTheBank,
  getAllSchollershipAdmin,
  getScholarshipByIdAdmin,
  DeleteTheScholarship,
  getAllLoansAdmin,
  getLoanByIdAdmin,
  DeleteTheLoan,
  getAdminStats,
  createScholarshipByAdmin,
  updateScholarshipByAdmin,
} from '../controller/adminController.js';
import { authorizePplOnly, isAuthenticatedUser } from '../middleWares/auth.js';

const adminRouter = express.Router();

// Users
adminRouter.get('/Admin/users',isAuthenticatedUser, authorizePplOnly("admin"), getAllUser);   // done
adminRouter.get('/Admin/users/:id',isAuthenticatedUser,  authorizePplOnly("admin"), getUserdetails); //done
adminRouter.put('/Admin/users/update/:id',isAuthenticatedUser,  authorizePplOnly("admin"), updatetoadmin); //done
adminRouter.delete('/Admin/users/delete/:id',isAuthenticatedUser,  authorizePplOnly("admin"), deleteUserbyadmin);  //done

// Banks
adminRouter.get('/Admin/banks',isAuthenticatedUser,  authorizePplOnly("admin"), getAllBanks); //done
adminRouter.get('/Admin/banks/:id',isAuthenticatedUser,  authorizePplOnly("admin"), getBankById);  //done
adminRouter.delete('/Admin/banks/:id',isAuthenticatedUser,  authorizePplOnly("admin"), deleteTheBank);  //done

// Scholarships
adminRouter.get('/Admin/scholarships',isAuthenticatedUser,  authorizePplOnly("Admin"), getAllSchollershipAdmin); //done
adminRouter.get('/Admin/scholarships/:id',isAuthenticatedUser,  authorizePplOnly("Admin"), getScholarshipByIdAdmin); //done
adminRouter.delete('/Admin/scholarships/:id',isAuthenticatedUser,  authorizePplOnly("Admin"), DeleteTheScholarship);  //done
adminRouter.put('/Admin/scholarships/:id', isAuthenticatedUser, authorizePplOnly("Admin"), updateScholarshipByAdmin); // new

// Loans
adminRouter.get('/Admin/loans',isAuthenticatedUser,  authorizePplOnly("admin"), getAllLoansAdmin);  //done
adminRouter.get('/Admin/loans/:id',isAuthenticatedUser,  authorizePplOnly("admin"), getLoanByIdAdmin);
adminRouter.delete('/Admin/loans/:id',isAuthenticatedUser,  authorizePplOnly("admin"), DeleteTheLoan);

// Admin stats
adminRouter.get('/Admin/stats', isAuthenticatedUser, authorizePplOnly("Admin"), getAdminStats);

// Admin create scholarship
adminRouter.post('/Admin/scholarships', isAuthenticatedUser, authorizePplOnly("Admin"), createScholarshipByAdmin);

export default adminRouter;
