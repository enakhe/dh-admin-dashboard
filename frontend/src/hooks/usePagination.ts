import { useState, useMemo } from 'react';

interface UsePaginationProps {
    data: any[];
    itemsPerPage?: number;
}

export const usePagination = ({ data, itemsPerPage = 10 }: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const totalItems = data.length;

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Reset to first page when data changes
    useMemo(() => {
        setCurrentPage(1);
    }, [data.length]);

    return {
        currentPage,
        totalPages,
        totalItems,
        paginatedData,
        goToPage,
        nextPage,
        prevPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
    };
};
