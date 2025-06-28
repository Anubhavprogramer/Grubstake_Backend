import asyncHandler from "../middleWares/catchAsyncErrors.js";
import Loan from "../models/Loans.js";
import Apifeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create Loan (works for both admin and bank, with debug logging)
export const createLoan = asyncHandler(async (req, res, next) => {
    let { name, description, link, amount, eligibilityCriteria, interestRate, isActive, avatar } = req.body;
    // Accept isActive as string or boolean
    if (typeof isActive === 'string') {
        isActive = isActive === 'true';
    }
    // Validate required fields
    if (!name || !description || !link || !amount || !eligibilityCriteria || !interestRate || !avatar) {
        return next(new ErrorHandler('All fields are required', 400));
    }
    // Set instituteCreated from req.bank (bank user) or req.user (admin)
    let instituteCreated = null;
    if (req.bank && req.bank._id) {
        instituteCreated = req.bank._id;
    } else if (req.user && req.user._id) {
        instituteCreated = req.user._id;
    }
    if (!instituteCreated) {
        // Debug log
        console.log('Loan creation failed: No bank or admin context found. req.user:', req.user, 'req.bank:', req.bank);
        return next(new ErrorHandler("Unauthorized: No bank or admin context found. Please login as a bank or admin.", 401));
    }
    // Debug log
    console.log('Creating loan with:', { name, description, link, amount, eligibilityCriteria, interestRate, isActive, avatar, instituteCreated });
    const loan = await Loan.create({
        name,
        description,
        link,
        amount,
        eligibilityCriteria,
        interestRate,
        isActive,
        avatar,
        instituteCreated
    });
    res.status(201).json({
        success: true,
        loan
    });
});

// Get all loans
export const getallLoans = asyncHandler(async (req, res, next) => {
    const resultperpage = 5;
    const LoanCount = await Loan.countDocuments();
    const apifeature = new Apifeatures(Loan.find(), req.query)
        .search()
        .filter()
        .pagination(resultperpage);
    const loans = await apifeature.query;
    res.status(200).json({
        success: true,
        loans,
        LoanCount
    });
});

// Get single loan by id
export const getLoansdetails = asyncHandler(async (req, res, next) => {
    const detailsOfLoan = await Loan.findById(req.params.id);
    if (!detailsOfLoan) {
        return next(new ErrorHandler("Loan not found", 404));
    }
    res.status(200).json({
        success: true,
        loan: detailsOfLoan,
    });
});

// Delete loan by id
export const deleteLoan = asyncHandler(async (req, res, next) => {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
        return next(new ErrorHandler("Loan not found", 404));
    }
    await loan.deleteOne();
    res.status(200).json({
        success: true,
        message: "Loan deleted successfully",
    });
});
