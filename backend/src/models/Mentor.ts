import mongoose, { Document, Schema } from 'mongoose';

export interface IMentor extends Document {
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

const MentorSchema = new Schema<IMentor>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
        maxlength: [20, 'Phone cannot exceed 20 characters']
    }
}, {
    timestamps: true
});

export default mongoose.model<IMentor>('Mentor', MentorSchema);
