import React, { useState } from 'react';
import { useGetMentorsQuery, useDeleteMentorMutation, useGetNewcomersQuery } from '../../services/api';
import { Mentor } from '../../types';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import Table from '../UI/Table';
import Pagination from '../UI/Pagination';
import SearchInput from '../UI/SearchInput';
import MetricsDashboard from '../Dashboard/MetricsDashboard';
import MentorForm from './MentorForm';
import { usePagination } from '../../hooks/usePagination';
import { useSearch } from '../../hooks/useSearch';
import { toast } from 'react-toastify';

const MentorList: React.FC = () => {
    const { data: mentorsData, isLoading, error } = useGetMentorsQuery();
    const { data: newcomersData } = useGetNewcomersQuery();
    const [deleteMentor] = useDeleteMentorMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMentor, setEditingMentor] = useState<Mentor | undefined>();
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const mentors = mentorsData?.data || [];
    const newcomers = newcomersData?.data || [];

    // Search functionality
    const { searchTerm, setSearchTerm, filteredData } = useSearch({
        data: mentors,
        searchFields: ['name', 'email', 'phone']
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

    const handleAddMentor = () => {
        setEditingMentor(undefined);
        setIsModalOpen(true);
    };

    const handleEditMentor = (mentor: Mentor) => {
        setEditingMentor(mentor);
        setIsModalOpen(true);
    };

    const handleDeleteMentor = async (mentor: Mentor) => {
        if (window.confirm(`Are you sure you want to delete ${mentor.name}?`)) {
            try {
                await deleteMentor(mentor._id).unwrap();
                toast.success('Mentor deleted successfully');
            } catch (error) {
                toast.error('Failed to delete mentor');
            }
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingMentor(undefined);
    };

    const handleFormSuccess = () => {
        setIsModalOpen(false);
        setEditingMentor(undefined);
        toast.success(editingMentor ? 'Mentor updated successfully' : 'Mentor added successfully');
    };

    const handleSort = (column: string, direction: 'asc' | 'desc') => {
        setSortColumn(column);
        setSortDirection(direction);
    };

    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            render: (value: string, mentor: Mentor) => (
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
            key: 'phone',
            label: 'Phone',
            sortable: true,
            render: (value: string) => (
                <div className="text-sm text-gray-900">{value}</div>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (value: any, mentor: Mentor) => (
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditMentor(mentor)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteMentor(mentor)}
                    >
                        Delete
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
                <p className="text-red-600">Error loading mentors. Please try again.</p>
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
                <h2 className="text-2xl font-bold text-gray-900">Mentors</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search mentors..."
                        className="w-full sm:w-64"
                    />
                    <Button onClick={handleAddMentor} variant="primary">
                        Add Mentor
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                data={paginatedData}
                loading={isLoading}
                emptyMessage="No mentors found"
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

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={editingMentor ? 'Edit Mentor' : 'Add New Mentor'}
                size="md"
            >
                <MentorForm
                    mentor={editingMentor}
                    onSuccess={handleFormSuccess}
                    onCancel={handleModalClose}
                />
            </Modal>
        </div>
    );
};

export default MentorList;
