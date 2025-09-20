import React, { useState } from 'react';
import { useGetNewcomersQuery, useDeleteNewcomerMutation, useGetMentorsQuery } from '../services/api';
import NewcomerForm from '../components/Newcomer/NewcomerForm';
import NewcomerDetails from '../components/Newcomer/NewcomerDetails';
import MetricsDashboard from '../components/Dashboard/MetricsDashboard';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Modal from '../components/UI/Modal';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import Table from '../components/UI/Table';
import Pagination from '../components/UI/Pagination';
import SearchInput from '../components/UI/SearchInput';
import { usePagination } from '../hooks/usePagination';
import { useSearch } from '../hooks/useSearch';
import { Newcomer } from '../types';
import { toast } from 'react-toastify';

const NewcomerPage: React.FC = () => {
    const { data: newcomersData, isLoading, error } = useGetNewcomersQuery();
    const { data: mentorsData } = useGetMentorsQuery();
    const [deleteNewcomer] = useDeleteNewcomerMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingNewcomer, setEditingNewcomer] = useState<Newcomer | undefined>();
    const [viewingNewcomer, setViewingNewcomer] = useState<Newcomer | undefined>();
    const [deletingNewcomer, setDeletingNewcomer] = useState<Newcomer | undefined>();
    const [isDeleting, setIsDeleting] = useState(false);
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const newcomers = newcomersData?.data || [];
    const mentors = mentorsData?.data || [];

    // Search functionality
    const { searchTerm, setSearchTerm, filteredData } = useSearch({
        data: newcomers,
        searchFields: ['fullName', 'email', 'network', 'mentor.name', 'mentor.email']
    });

    // Pagination functionality
    const {
        currentPage,
        totalPages,
        totalItems,
        paginatedData,
        goToPage
    } = usePagination({
        data: filteredData,
        itemsPerPage: 10
    });

    const handleAddNewcomer = () => {
        setEditingNewcomer(undefined);
        setIsModalOpen(true);
    };

    const handleViewNewcomer = (newcomer: Newcomer) => {
        setViewingNewcomer(newcomer);
        setIsDetailsModalOpen(true);
    };

    const handleEditNewcomer = (newcomer: Newcomer) => {
        setEditingNewcomer(newcomer);
        setIsModalOpen(true);
        setIsDetailsModalOpen(false);
    };

    const handleDeleteNewcomer = (newcomer: Newcomer) => {
        setDeletingNewcomer(newcomer);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingNewcomer) return;

        try {
            setIsDeleting(true);
            await deleteNewcomer(deletingNewcomer._id).unwrap();
            toast.success('Newcomer deleted successfully');
            setIsDeleteModalOpen(false);
            setDeletingNewcomer(undefined);
        } catch (error) {
            toast.error('Failed to delete newcomer');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingNewcomer(undefined);
    };

    const handleDetailsModalClose = () => {
        setIsDetailsModalOpen(false);
        setViewingNewcomer(undefined);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setDeletingNewcomer(undefined);
    };

    const handleFormSuccess = () => {
        setIsModalOpen(false);
        setEditingNewcomer(undefined);
        toast.success(editingNewcomer ? 'Newcomer updated successfully' : 'Newcomer added successfully');
    };

    const handleSort = (column: string, direction: 'asc' | 'desc') => {
        setSortColumn(column);
        setSortDirection(direction);
    };

    const getStatusBadges = (newcomer: Newcomer) => {
        const statusFlags = Object.entries(newcomer)
            .filter(([key, value]) =>
                typeof value === 'boolean' && value &&
                !['_id', 'createdAt', 'updatedAt'].includes(key)
            );

        return statusFlags.slice(0, 3).map(([key]) => (
            <span
                key={key}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white"
            >
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </span>
        ));
    };

    const columns = [
        {
            key: 'fullName',
            label: 'Name',
            sortable: true,
            render: (value: string, newcomer: Newcomer) => (
                <div className="text-sm font-medium text-gray-900">{value}</div>
            )
        },
        {
            key: 'email',
            label: 'Email',
            sortable: true,
            render: (value: string) => (
                <div className="text-sm text-gray-900">{value}</div>
            )
        },
        {
            key: 'network',
            label: 'Network',
            sortable: true,
            render: (value: string) => (
                <div className="text-sm text-gray-900">{value}</div>
            )
        },
        {
            key: 'mentor',
            label: 'Mentor',
            sortable: true,
            render: (value: any, newcomer: Newcomer) => (
                <div className="text-sm text-gray-900">{newcomer.mentor.name}</div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            render: (value: any, newcomer: Newcomer) => {
                const statusFlags = Object.entries(newcomer)
                    .filter(([key, value]) =>
                        typeof value === 'boolean' && value &&
                        !['_id', 'createdAt', 'updatedAt'].includes(key)
                    );

                return (
                    <div className="flex flex-wrap gap-1">
                        {statusFlags.slice(0, 3).map(([key]) => (
                            <span
                                key={key}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white"
                            >
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                        ))}
                        {statusFlags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                +{statusFlags.length - 3} more
                            </span>
                        )}
                    </div>
                );
            }
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (value: any, newcomer: Newcomer) => (
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewNewcomer(newcomer)}
                        title="View Details"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditNewcomer(newcomer)}
                        title="Edit"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteNewcomer(newcomer)}
                        title="Delete"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </Button>
                </div>
            )
        }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Error loading newcomers. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Metrics Dashboard */}
            <MetricsDashboard
                newcomers={newcomers}
                mentors={mentors}
                loading={isLoading}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Newcomer Management</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search newcomers..."
                        className="w-full sm:w-64"
                    />
                    <Button onClick={handleAddNewcomer} variant="primary">
                        Add Newcomer
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                data={paginatedData}
                loading={isLoading}
                emptyMessage="No newcomers found"
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
            />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    totalItems={totalItems}
                    itemsPerPage={10}
                />
            )}

            {/* Add/Edit Newcomer Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={editingNewcomer ? 'Edit Newcomer' : 'Add New Newcomer'}
                size="xl"
            >
                <NewcomerForm
                    newcomer={editingNewcomer}
                    onSuccess={handleFormSuccess}
                    onCancel={handleModalClose}
                />
            </Modal>

            {/* Newcomer Details Modal */}
            {viewingNewcomer && (
                <NewcomerDetails
                    newcomer={viewingNewcomer}
                    isOpen={isDetailsModalOpen}
                    onClose={handleDetailsModalClose}
                    onEdit={() => handleEditNewcomer(viewingNewcomer)}
                    onDelete={() => handleDeleteNewcomer(viewingNewcomer)}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                onConfirm={handleConfirmDelete}
                title="Delete Newcomer"
                message={`Are you sure you want to delete ${deletingNewcomer?.fullName}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default NewcomerPage;
