import express from 'express';
import {
    getAllMentors,
    getMentorById,
    createMentor,
    updateMentor,
    deleteMentor
} from '../controllers/mentorController';
import { validateMentor } from '../middleware/validation';

const router = express.Router();

// GET /api/mentors - Get all mentors
router.get('/', getAllMentors);

// GET /api/mentors/:id - Get mentor by ID
router.get('/:id', getMentorById);

// POST /api/mentors - Create new mentor
router.post('/', validateMentor, createMentor);

// PUT /api/mentors/:id - Update mentor
router.put('/:id', validateMentor, updateMentor);

// DELETE /api/mentors/:id - Delete mentor
router.delete('/:id', deleteMentor);

export default router;
