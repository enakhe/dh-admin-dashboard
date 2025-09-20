import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateNewcomerMutation, useUpdateNewcomerMutation, useGetMentorsQuery } from '../../services/api';
import { NewcomerFormData, Newcomer } from '../../types';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';

interface NewcomerFormProps {
    newcomer?: Newcomer;
    onSuccess: () => void;
    onCancel: () => void;
}

const NewcomerForm: React.FC<NewcomerFormProps> = ({ newcomer, onSuccess, onCancel }) => {
    const [createNewcomer, { isLoading: isCreating }] = useCreateNewcomerMutation();
    const [updateNewcomer, { isLoading: isUpdating }] = useUpdateNewcomerMutation();
    const { data: mentorsData, isLoading: isLoadingMentors } = useGetMentorsQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<NewcomerFormData>();

    const [statusFlags, setStatusFlags] = useState({
        newConvert: false,
        newConvertClass1: false,
        newConvertClass2: false,
        firstTimeGuest: false,
        secondTimeGuest: false,
        thirdTimeGuest: false,
        membershipClass1: false,
        membershipClass2: false,
        foundationClass1: false,
        foundationClass2: false,
        foundationClass3: false,
        foundationClass4: false,
        dreamTeamLeader: false,
        pathfinderCIDS: false,
        g4aTraining: false,
    });

    useEffect(() => {
        if (newcomer) {
            // Populate form with existing data
            setValue('fullName', newcomer.fullName);
            setValue('email', newcomer.email);
            setValue('address', newcomer.address);
            setValue('phoneNumber', newcomer.phoneNumber);
            setValue('mentor', newcomer.mentor._id);
            setValue('network', newcomer.network);

            setStatusFlags({
                newConvert: newcomer.newConvert,
                newConvertClass1: newcomer.newConvertClass1,
                newConvertClass2: newcomer.newConvertClass2,
                firstTimeGuest: newcomer.firstTimeGuest,
                secondTimeGuest: newcomer.secondTimeGuest,
                thirdTimeGuest: newcomer.thirdTimeGuest,
                membershipClass1: newcomer.membershipClass1,
                membershipClass2: newcomer.membershipClass2,
                foundationClass1: newcomer.foundationClass1,
                foundationClass2: newcomer.foundationClass2,
                foundationClass3: newcomer.foundationClass3,
                foundationClass4: newcomer.foundationClass4,
                dreamTeamLeader: newcomer.dreamTeamLeader,
                pathfinderCIDS: newcomer.pathfinderCIDS,
                g4aTraining: newcomer.g4aTraining,
            });
        }
    }, [newcomer, setValue]);

    const handleStatusChange = (field: keyof typeof statusFlags) => {
        setStatusFlags(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const onSubmit = async (data: NewcomerFormData) => {
        try {
            const formData = {
                ...data,
                ...statusFlags
            };

            if (newcomer) {
                await updateNewcomer({ id: newcomer._id, data: formData }).unwrap();
            } else {
                await createNewcomer(formData).unwrap();
            }

            onSuccess();
        } catch (error) {
            console.error('Error saving newcomer:', error);
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="form-label">Full Name *</label>
                    <input
                        type="text"
                        {...register('fullName', { required: 'Full name is required' })}
                        className="form-input"
                        placeholder="Enter full name"
                    />
                    {errors.fullName && (
                        <p className="form-error">{errors.fullName.message}</p>
                    )}
                </div>

                <div>
                    <label className="form-label">Email *</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        className="form-input"
                        placeholder="Enter email address"
                    />
                    {errors.email && (
                        <p className="form-error">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                        type="tel"
                        {...register('phoneNumber', { required: 'Phone number is required' })}
                        className="form-input"
                        placeholder="Enter phone number"
                    />
                    {errors.phoneNumber && (
                        <p className="form-error">{errors.phoneNumber.message}</p>
                    )}
                </div>

                <div>
                    <label className="form-label">Network *</label>
                    <input
                        type="text"
                        {...register('network', { required: 'Network is required' })}
                        className="form-input"
                        placeholder="Enter network"
                    />
                    {errors.network && (
                        <p className="form-error">{errors.network.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="form-label">Address *</label>
                <textarea
                    {...register('address', { required: 'Address is required' })}
                    className="form-input"
                    rows={3}
                    placeholder="Enter full address"
                />
                {errors.address && (
                    <p className="form-error">{errors.address.message}</p>
                )}
            </div>

            <div>
                <label className="form-label">Mentor *</label>
                {isLoadingMentors ? (
                    <LoadingSpinner size="sm" className="py-2" />
                ) : (
                    <select
                        {...register('mentor', { required: 'Mentor is required' })}
                        className="form-input"
                    >
                        <option value="">Select a mentor</option>
                        {mentorsData?.data?.map((mentor) => (
                            <option key={mentor._id} value={mentor._id}>
                                {mentor.name} - {mentor.email}
                            </option>
                        ))}
                    </select>
                )}
                {errors.mentor && (
                    <p className="form-error">{errors.mentor.message}</p>
                )}
            </div>

            {/* Status Flags */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Status Flags</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(statusFlags).map(([key, value]) => (
                        <label key={key} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={() => handleStatusChange(key as keyof typeof statusFlags)}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                >
                    {newcomer ? 'Update Newcomer' : 'Add Newcomer'}
                </Button>
            </div>
        </form>
    );
};

export default NewcomerForm;
