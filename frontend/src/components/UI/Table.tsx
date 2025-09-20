import React from 'react';

interface Column {
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
    sortable?: boolean;
}

interface TableProps {
    columns: Column[];
    data: any[];
    loading?: boolean;
    emptyMessage?: string;
    onSort?: (column: string, direction: 'asc' | 'desc') => void;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
}

const Table: React.FC<TableProps> = ({
    columns,
    data,
    loading = false,
    emptyMessage = 'No data found',
    onSort,
    sortColumn,
    sortDirection = 'asc'
}) => {
    const handleSort = (column: string) => {
        if (onSort) {
            const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
            onSort(column, direction);
        }
    };

    if (loading) {
        return (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="flex justify-center items-center py-12">
                    <div className="spinner h-8 w-8"></div>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                        }`}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{column.label}</span>
                                        {column.sortable && (
                                            <div className="flex flex-col">
                                                <svg
                                                    className={`w-3 h-3 ${sortColumn === column.key && sortDirection === 'asc'
                                                            ? 'text-primary'
                                                            : 'text-gray-400'
                                                        }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                </svg>
                                                <svg
                                                    className={`w-3 h-3 -mt-1 ${sortColumn === column.key && sortDirection === 'desc'
                                                            ? 'text-primary'
                                                            : 'text-gray-400'
                                                        }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={item._id || index} className="hover:bg-gray-50">
                                {columns.map((column) => (
                                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : item[column.key]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
