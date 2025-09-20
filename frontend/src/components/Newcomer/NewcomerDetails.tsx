import React from 'react';
import { Newcomer } from '../../types';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

interface NewcomerDetailsProps {
    newcomer: Newcomer;
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const NewcomerDetails: React.FC<NewcomerDetailsProps> = ({
    newcomer,
    isOpen,
    onClose,
    onEdit,
    onDelete
}) => {
    const getStatusFlags = () => {
        return Object.entries(newcomer)
            .filter(([key, value]) =>
                typeof value === 'boolean' && value &&
                !['_id', 'createdAt', 'updatedAt'].includes(key)
            );
    };

    const statusFlags = getStatusFlags();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Newcomer Details"
            size="lg"
        >
            <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                            <p className="text-sm text-gray-900">{newcomer.fullName}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="text-sm text-gray-900">{newcomer.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Phone Number</label>
                            <p className="text-sm text-gray-900">{newcomer.phoneNumber}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Network</label>
                            <p className="text-sm text-gray-900">{newcomer.network}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-500">Address</label>
                            <p className="text-sm text-gray-900">{newcomer.address}</p>
                        </div>
                    </div>
                </div>

                {/* Mentor Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentor Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Mentor Name</label>
                            <p className="text-sm text-gray-900">{newcomer.mentor.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Mentor Email</label>
                            <p className="text-sm text-gray-900">{newcomer.mentor.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Mentor Phone</label>
                            <p className="text-sm text-gray-900">{newcomer.mentor.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Status Flags */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Status & Progress</h3>
                    {statusFlags.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {statusFlags.map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-900">
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No status flags set</p>
                    )}
                </div>

                {/* Timestamps */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Created At</label>
                            <p className="text-sm text-gray-900">
                                {new Date(newcomer.createdAt).toLocaleDateString()} at{' '}
                                {new Date(newcomer.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Last Updated</label>
                            <p className="text-sm text-gray-900">
                                {new Date(newcomer.updatedAt).toLocaleDateString()} at{' '}
                                {new Date(newcomer.updatedAt).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onEdit}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default NewcomerDetails;
