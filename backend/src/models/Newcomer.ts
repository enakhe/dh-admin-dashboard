import mongoose, { Document, Schema } from 'mongoose';

export interface INewcomer extends Document {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    mentor: mongoose.Types.ObjectId;
    network: string;
    // Status flags
    newConvert: boolean;
    newConvertClass1: boolean;
    newConvertClass2: boolean;
    firstTimeGuest: boolean;
    secondTimeGuest: boolean;
    thirdTimeGuest: boolean;
    membershipClass1: boolean;
    membershipClass2: boolean;
    foundationClass1: boolean;
    foundationClass2: boolean;
    foundationClass3: boolean;
    foundationClass4: boolean;
    dreamTeamLeader: boolean;
    pathfinderCIDS: boolean;
    g4aTraining: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NewcomerSchema = new Schema<INewcomer>({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxlength: [200, 'Address cannot exceed 200 characters']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    mentor: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
        required: [true, 'Mentor is required']
    },
    network: {
        type: String,
        required: [true, 'Network is required'],
        trim: true,
        maxlength: [50, 'Network cannot exceed 50 characters']
    },
    // Status flags with default values
    newConvert: { type: Boolean, default: false },
    newConvertClass1: { type: Boolean, default: false },
    newConvertClass2: { type: Boolean, default: false },
    firstTimeGuest: { type: Boolean, default: false },
    secondTimeGuest: { type: Boolean, default: false },
    thirdTimeGuest: { type: Boolean, default: false },
    membershipClass1: { type: Boolean, default: false },
    membershipClass2: { type: Boolean, default: false },
    foundationClass1: { type: Boolean, default: false },
    foundationClass2: { type: Boolean, default: false },
    foundationClass3: { type: Boolean, default: false },
    foundationClass4: { type: Boolean, default: false },
    dreamTeamLeader: { type: Boolean, default: false },
    pathfinderCIDS: { type: Boolean, default: false },
    g4aTraining: { type: Boolean, default: false }
}, {
    timestamps: true
});

export default mongoose.model<INewcomer>('Newcomer', NewcomerSchema);
