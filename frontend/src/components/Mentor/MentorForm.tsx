import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateMentorMutation, useUpdateMentorMutation } from '../../services/api';
import { MentorFormData, Mentor } from '../../types';
import Button from '../UI/Button';

interface MentorFormProps {
    mentor?: Mentor;
    onSuccess: () => void;
    onCancel: () => void;
}

const MentorForm: React.FC<MentorFormProps> = ({ mentor, onSuccess, onCancel }) => {
    const [createMentor, { isLoading: isCreating }] = useCreateMentorMutation();
    const [updateMentor, { isLoading: isUpdating }] = useUpdateMentorMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<MentorFormData>();

    useEffect(() => {
        if (mentor) {
            reset({
                name: mentor.name,
                email: mentor.email,
                phone: mentor.phone
            });
        }
    }, [mentor, reset]);

    const onSubmit = async (data: MentorFormData) => {
        try {
            if (mentor) {
                await updateMentor({ id: mentor._id, data }).unwrap();
            } else {
                await createMentor(data).unwrap();
            }

            onSuccess();
        } catch (error) {
            console.error('Error saving mentor:', error);
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="form-label">Name *</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="form-input"
                        placeholder="Enter mentor name"
                    />
                    {errors.name && (
                        <p className="form-error">{errors.name.message}</p>
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

                <div className="md:col-span-2">
                    <label className="form-label">Phone *</label>
                    <input
                        type="tel"
                        {...register('phone', { required: 'Phone is required' })}
                        className="form-input"
                        placeholder="Enter phone number"
                    />
                    {errors.phone && (
                        <p className="form-error">{errors.phone.message}</p>
                    )}
                </div>
            </div>

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
                    {mentor ? 'Update Mentor' : 'Add Mentor'}
                </Button>
            </div>
        </form>
    );
};

export default MentorForm;
