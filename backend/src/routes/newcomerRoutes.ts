import express from 'express';
import {
    getAllNewcomers,
    getNewcomerById,
    createNewcomer,
    updateNewcomer,
    deleteNewcomer
} from '../controllers/newcomerController';
import { validateNewcomer } from '../middleware/validation';

const router = express.Router();

// GET /api/newcomers - Get all newcomers
router.get('/', getAllNewcomers);

// GET /api/newcomers/:id - Get newcomer by ID
router.get('/:id', getNewcomerById);

// POST /api/newcomers - Create new newcomer
router.post('/', validateNewcomer, createNewcomer);

// PUT /api/newcomers/:id - Update newcomer
router.put('/:id', validateNewcomer, updateNewcomer);

// DELETE /api/newcomers/:id - Delete newcomer
router.delete('/:id', deleteNewcomer);

export default router;
