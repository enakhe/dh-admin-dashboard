import { useState, useMemo } from 'react';

interface UseSearchProps {
    data: any[];
    searchFields: string[];
}

export const useSearch = ({ data, searchFields }: UseSearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) {
            return data;
        }

        const lowercaseSearchTerm = searchTerm.toLowerCase();

        return data.filter((item) =>
            searchFields.some((field) => {
                const value = item[field];
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(lowercaseSearchTerm);
                }
                if (typeof value === 'object' && value !== null) {
                    // Handle nested objects (like mentor in newcomer)
                    return Object.values(value).some((nestedValue) =>
                        typeof nestedValue === 'string' &&
                        nestedValue.toLowerCase().includes(lowercaseSearchTerm)
                    );
                }
                return false;
            })
        );
    }, [data, searchTerm, searchFields]);

    return {
        searchTerm,
        setSearchTerm,
        filteredData
    };
};
