import { body } from 'express-validator';

// Newcomer validation rules
export const validateNewcomer = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ max: 100 })
        .withMessage('Full name cannot exceed 100 characters'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ max: 200 })
        .withMessage('Address cannot exceed 200 characters'),

    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .isLength({ max: 20 })
        .withMessage('Phone number cannot exceed 20 characters'),

    body('mentor')
        .isMongoId()
        .withMessage('Please provide a valid mentor ID'),

    body('network')
        .trim()
        .notEmpty()
        .withMessage('Network is required')
        .isLength({ max: 50 })
        .withMessage('Network cannot exceed 50 characters'),

    // Optional boolean fields
    body('newConvert').optional().isBoolean(),
    body('newConvertClass1').optional().isBoolean(),
    body('newConvertClass2').optional().isBoolean(),
    body('firstTimeGuest').optional().isBoolean(),
    body('secondTimeGuest').optional().isBoolean(),
    body('thirdTimeGuest').optional().isBoolean(),
    body('membershipClass1').optional().isBoolean(),
    body('membershipClass2').optional().isBoolean(),
    body('foundationClass1').optional().isBoolean(),
    body('foundationClass2').optional().isBoolean(),
    body('foundationClass3').optional().isBoolean(),
    body('foundationClass4').optional().isBoolean(),
    body('dreamTeamLeader').optional().isBoolean(),
    body('pathfinderCIDS').optional().isBoolean(),
    body('g4aTraining').optional().isBoolean()
];

// Mentor validation rules
export const validateMentor = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name cannot exceed 100 characters'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone is required')
        .isLength({ max: 20 })
        .withMessage('Phone cannot exceed 20 characters')
];
