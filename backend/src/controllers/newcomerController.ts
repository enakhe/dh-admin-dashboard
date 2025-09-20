import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Newcomer, { INewcomer } from '../models/Newcomer';

// Get all newcomers
export const getAllNewcomers = async (req: Request, res: Response) => {
    try {
        const newcomers = await Newcomer.find()
            .populate('mentor', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: newcomers,
            count: newcomers.length
        });
    } catch (error) {
        console.error('Error fetching newcomers:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching newcomers',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

// Get newcomer by ID
export const getNewcomerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newcomer = await Newcomer.findById(id).populate('mentor', 'name email phone');

        if (!newcomer) {
            return res.status(404).json({
                success: false,
                message: 'Newcomer not found'
            });
        }

        res.status(200).json({
            success: true,
            data: newcomer
        });
    } catch (error) {
        console.error('Error fetching newcomer:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching newcomer',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

// Create new newcomer
export const createNewcomer = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        const newcomerData: Partial<INewcomer> = req.body;
        const newcomer = new Newcomer(newcomerData);
        await newcomer.save();

        const populatedNewcomer = await Newcomer.findById(newcomer._id)
            .populate('mentor', 'name email phone');

        res.status(201).json({
            success: true,
            data: populatedNewcomer,
            message: 'Newcomer created successfully'
        });
    } catch (error) {
        console.error('Error creating newcomer:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating newcomer',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

// Update newcomer
export const updateNewcomer = async (req: Request, res: Response) => {
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

        const newcomer = await Newcomer.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('mentor', 'name email phone');

        if (!newcomer) {
            return res.status(404).json({
                success: false,
                message: 'Newcomer not found'
            });
        }

        res.status(200).json({
            success: true,
            data: newcomer,
            message: 'Newcomer updated successfully'
        });
    } catch (error) {
        console.error('Error updating newcomer:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating newcomer',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

// Delete newcomer
export const deleteNewcomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newcomer = await Newcomer.findByIdAndDelete(id);

        if (!newcomer) {
            return res.status(404).json({
                success: false,
                message: 'Newcomer not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Newcomer deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting newcomer:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting newcomer',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
