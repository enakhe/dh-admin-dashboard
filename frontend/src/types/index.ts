export interface Mentor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export interface Newcomer {
    _id: string;
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    mentor: Mentor;
    network: string;
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
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    count?: number;
}

export interface NewcomerFormData {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    mentor: string;
    network: string;
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
}

export interface MentorFormData {
    name: string;
    email: string;
    phone: string;
}
