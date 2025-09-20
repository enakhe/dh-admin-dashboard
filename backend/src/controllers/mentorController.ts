import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Mentor, { IMentor } from '../models/Mentor';

// Get all mentors
export const getAllMentors = async (req: Request, res: Response) => {
    try {
        const mentors = await Mentor.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: mentors,
            count: mentors.length
        });
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching mentors',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

// Get mentor by ID
export const getMentorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mentor = await Mentor.findById(id);

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: 'Mentor not found'
            });
        }

        res.status(200).json({
            success: true,
            data: mentor
        });
    } catch (error) {
        console.error('Error fetching mentor:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching mentor',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

// Create new mentor
export const createMentor = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        const mentorData: Partial<IMentor> = req.body;
        const mentor = new Mentor(mentorData);
        await mentor.save();

        res.status(201).json({
            success: true,
            data: mentor,
            message: 'Mentor created successfully'
        });
    } catch (error: any) {
        console.error('Error creating mentor:', error);

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating mentor',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

// Update mentor
export const updateMentor = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        const { id } = req.params;
        const updateData = req.body;

        const mentor = await Mentor.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: 'Mentor not found'
            });
        }

        res.status(200).json({
            success: true,
            data: mentor,
            message: 'Mentor updated successfully'
        });
    } catch (error: any) {
        console.error('Error updating mentor:', error);

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating mentor',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

// Delete mentor
export const deleteMentor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mentor = await Mentor.findByIdAndDelete(id);

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: 'Mentor not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Mentor deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting mentor:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting mentor',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
