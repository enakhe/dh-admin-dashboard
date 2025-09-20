import React from 'react';

interface MetricCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    trend?: {
        value: number;
        isPositive: boolean;
    };
    subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    icon,
    color = 'primary',
    trend,
    subtitle
}) => {
    const getColorClasses = () => {
        switch (color) {
            case 'primary':
                return {
                    bg: 'bg-primary',
                    text: 'text-primary',
                    light: 'bg-blue-50',
                    icon: 'text-primary'
                };
            case 'secondary':
                return {
                    bg: 'bg-secondary',
                    text: 'text-secondary',
                    light: 'bg-blue-50',
                    icon: 'text-secondary'
                };
            case 'success':
                return {
                    bg: 'bg-green-600',
                    text: 'text-green-600',
                    light: 'bg-green-50',
                    icon: 'text-green-600'
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-600',
                    text: 'text-yellow-600',
                    light: 'bg-yellow-50',
                    icon: 'text-yellow-600'
                };
            case 'danger':
                return {
                    bg: 'bg-red-600',
                    text: 'text-red-600',
                    light: 'bg-red-50',
                    icon: 'text-red-600'
                };
            case 'info':
                return {
                    bg: 'bg-gray-600',
                    text: 'text-gray-600',
                    light: 'bg-gray-50',
                    icon: 'text-gray-600'
                };
            default:
                return {
                    bg: 'bg-primary',
                    text: 'text-primary',
                    light: 'bg-blue-50',
                    icon: 'text-primary'
                };
        }
    };

    const colors = getColorClasses();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg ${colors.light}`}>
                    <div className={colors.icon}>
                        {icon}
                    </div>
                </div>
                <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
                    <div className="flex items-baseline">
                        <p className={`text-2xl font-semibold ${colors.text}`}>
                            {typeof value === 'number' ? value.toLocaleString() : value}
                        </p>
                        {trend && (
                            <div className={`ml-2 flex items-baseline text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                <svg
                                    className={`self-center flex-shrink-0 h-4 w-4 ${trend.isPositive ? 'transform rotate-0' : 'transform rotate-180'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-1">{Math.abs(trend.value)}%</span>
                            </div>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
