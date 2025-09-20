import React, { useMemo } from 'react';
import { useGetNewcomersQuery, useGetMentorsQuery } from '../services/api';
import BarChart from '../components/Charts/BarChart';
import LineChart from '../components/Charts/LineChart';
import DoughnutChart from '../components/Charts/DoughnutChart';
import PolarAreaChart from '../components/Charts/PolarAreaChart';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { Newcomer, Mentor } from '../types';

const AnalyticsPage: React.FC = () => {
    const { data: newcomersData, isLoading: newcomersLoading } = useGetNewcomersQuery();
    const { data: mentorsData, isLoading: mentorsLoading } = useGetMentorsQuery();

    const newcomers = newcomersData?.data || [];
    const mentors = mentorsData?.data || [];
    const isLoading = newcomersLoading || mentorsLoading;

    // Process data for charts
    const analyticsData = useMemo(() => {
        if (!newcomers.length || !mentors.length) return null;

        // Monthly newcomer registration data
        const monthlyData = newcomers.reduce((acc: { [key: string]: number }, newcomer) => {
            const date = new Date(newcomer.createdAt);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            acc[monthKey] = (acc[monthKey] || 0) + 1;
            return acc;
        }, {});

        const monthlyLabels = Object.keys(monthlyData).sort();
        const monthlyValues = monthlyLabels.map(label => monthlyData[label]);

        // Newcomer progress stages
        const progressStages = {
            'First Time Guest': newcomers.filter(n => n.firstTimeGuest).length,
            'Second Time Guest': newcomers.filter(n => n.secondTimeGuest).length,
            'Third Time Guest': newcomers.filter(n => n.thirdTimeGuest).length,
            'New Convert': newcomers.filter(n => n.newConvert).length,
            'New Convert Class 1': newcomers.filter(n => n.newConvertClass1).length,
            'New Convert Class 2': newcomers.filter(n => n.newConvertClass2).length,
            'Membership Class 1': newcomers.filter(n => n.membershipClass1).length,
            'Membership Class 2': newcomers.filter(n => n.membershipClass2).length,
            'Foundation Class 1': newcomers.filter(n => n.foundationClass1).length,
            'Foundation Class 2': newcomers.filter(n => n.foundationClass2).length,
            'Foundation Class 3': newcomers.filter(n => n.foundationClass3).length,
            'Foundation Class 4': newcomers.filter(n => n.foundationClass4).length,
        };

        // Mentor effectiveness (newcomers per mentor)
        const mentorEffectiveness = mentors.map(mentor => {
            const assignedNewcomers = newcomers.filter(n => n.mentor._id === mentor._id);
            return {
                mentor: mentor.name,
                newcomers: assignedNewcomers.length,
                newConverts: assignedNewcomers.filter(n => n.newConvert).length,
                foundationCompleters: assignedNewcomers.filter(n =>
                    n.foundationClass1 && n.foundationClass2 && n.foundationClass3 && n.foundationClass4
                ).length,
            };
        }).sort((a, b) => b.newcomers - a.newcomers);

        // Class completion rates
        const classCompletion = {
            'New Convert Classes': {
                'Class 1': newcomers.filter(n => n.newConvertClass1).length,
                'Class 2': newcomers.filter(n => n.newConvertClass2).length,
            },
            'Membership Classes': {
                'Class 1': newcomers.filter(n => n.membershipClass1).length,
                'Class 2': newcomers.filter(n => n.membershipClass2).length,
            },
            'Foundation Classes': {
                'Class 1': newcomers.filter(n => n.foundationClass1).length,
                'Class 2': newcomers.filter(n => n.foundationClass2).length,
                'Class 3': newcomers.filter(n => n.foundationClass3).length,
                'Class 4': newcomers.filter(n => n.foundationClass4).length,
            },
        };

        // Leadership and training metrics
        const leadershipMetrics = {
            'Dream Team Leaders': newcomers.filter(n => n.dreamTeamLeader).length,
            'Pathfinder/CIDS': newcomers.filter(n => n.pathfinderCIDS).length,
            'G4A Training': newcomers.filter(n => n.g4aTraining).length,
        };

        // Network distribution
        const networkDistribution = newcomers.reduce((acc: { [key: string]: number }, newcomer) => {
            acc[newcomer.network] = (acc[newcomer.network] || 0) + 1;
            return acc;
        }, {});

        return {
            monthlyData: {
                labels: monthlyLabels,
                values: monthlyValues,
            },
            progressStages,
            mentorEffectiveness,
            classCompletion,
            leadershipMetrics,
            networkDistribution,
        };
    }, [newcomers, mentors]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!analyticsData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No data available for analytics</p>
            </div>
        );
    }

    const colors = {
        primary: '#0659b4',
        secondary: '#289df9',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#6b7280',
    };

    const chartColors = [
        colors.primary,
        colors.secondary,
        colors.success,
        colors.warning,
        colors.danger,
        colors.info,
        '#8b5cf6',
        '#f97316',
        '#06b6d4',
        '#84cc16',
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Growth and progress insights</p>
            </div>

            {/* Monthly Growth Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChart
                    title="Monthly Newcomer Registration"
                    data={{
                        labels: analyticsData.monthlyData.labels,
                        datasets: [
                            {
                                label: 'New Registrations',
                                data: analyticsData.monthlyData.values,
                                backgroundColor: colors.primary,
                                borderColor: colors.primary,
                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={300}
                />

                <LineChart
                    title="Newcomer Growth Trend"
                    data={{
                        labels: analyticsData.monthlyData.labels,
                        datasets: [
                            {
                                label: 'Cumulative Newcomers',
                                data: analyticsData.monthlyData.values.reduce((acc: number[], val, index) => {
                                    acc.push((acc[index - 1] || 0) + val);
                                    return acc;
                                }, []),
                                borderColor: colors.secondary,
                                backgroundColor: colors.secondary + '20',
                                tension: 0.4,
                            },
                        ],
                    }}
                    height={300}
                />
            </div>

            {/* Progress Stages and Network Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DoughnutChart
                    title="Newcomer Progress Distribution"
                    data={{
                        labels: Object.keys(analyticsData.progressStages),
                        datasets: [
                            {
                                label: 'Count',
                                data: Object.values(analyticsData.progressStages),
                                backgroundColor: chartColors,
                                borderColor: chartColors.map(color => color + '80'),
                                borderWidth: 2,
                            },
                        ],
                    }}
                    height={400}
                />

                <PolarAreaChart
                    title="Network Distribution"
                    data={{
                        labels: Object.keys(analyticsData.networkDistribution),
                        datasets: [
                            {
                                label: 'Newcomers',
                                data: Object.values(analyticsData.networkDistribution),
                                backgroundColor: chartColors,
                                borderColor: chartColors.map(color => color + '80'),
                                borderWidth: 2,
                            },
                        ],
                    }}
                    height={400}
                />
            </div>

            {/* Mentor Effectiveness */}
            <BarChart
                title="Mentor Effectiveness - Total Newcomers Assigned"
                data={{
                    labels: analyticsData.mentorEffectiveness.map(m => m.mentor),
                    datasets: [
                        {
                            label: 'Total Newcomers',
                            data: analyticsData.mentorEffectiveness.map(m => m.newcomers),
                            backgroundColor: colors.primary,
                            borderColor: colors.primary,
                            borderWidth: 1,
                        },
                        {
                            label: 'New Converts',
                            data: analyticsData.mentorEffectiveness.map(m => m.newConverts),
                            backgroundColor: colors.success,
                            borderColor: colors.success,
                            borderWidth: 1,
                        },
                        {
                            label: 'Foundation Completers',
                            data: analyticsData.mentorEffectiveness.map(m => m.foundationCompleters),
                            backgroundColor: colors.warning,
                            borderColor: colors.warning,
                            borderWidth: 1,
                        },
                    ],
                }}
                height={400}
            />

            {/* Class Completion Rates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <BarChart
                    title="New Convert Classes"
                    data={{
                        labels: Object.keys(analyticsData.classCompletion['New Convert Classes']),
                        datasets: [
                            {
                                label: 'Completions',
                                data: Object.values(analyticsData.classCompletion['New Convert Classes']),
                                backgroundColor: [colors.primary, colors.secondary],
                                borderColor: [colors.primary, colors.secondary],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={300}
                />

                <BarChart
                    title="Membership Classes"
                    data={{
                        labels: Object.keys(analyticsData.classCompletion['Membership Classes']),
                        datasets: [
                            {
                                label: 'Completions',
                                data: Object.values(analyticsData.classCompletion['Membership Classes']),
                                backgroundColor: [colors.success, colors.warning],
                                borderColor: [colors.success, colors.warning],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={300}
                />

                <BarChart
                    title="Foundation Classes"
                    data={{
                        labels: Object.keys(analyticsData.classCompletion['Foundation Classes']),
                        datasets: [
                            {
                                label: 'Completions',
                                data: Object.values(analyticsData.classCompletion['Foundation Classes']),
                                backgroundColor: chartColors.slice(0, 4),
                                borderColor: chartColors.slice(0, 4),
                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={300}
                />
            </div>

            {/* Leadership and Training Metrics */}
            <DoughnutChart
                title="Leadership & Training Completion"
                data={{
                    labels: Object.keys(analyticsData.leadershipMetrics),
                    datasets: [
                        {
                            label: 'Completions',
                            data: Object.values(analyticsData.leadershipMetrics),
                            backgroundColor: [colors.success, colors.warning, colors.info],
                            borderColor: [colors.success, colors.warning, colors.info],
                            borderWidth: 2,
                        },
                    ],
                }}
                height={400}
            />

            {/* Summary Statistics */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                            {analyticsData.monthlyData.values.reduce((a, b) => a + b, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Newcomers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-success">
                            {analyticsData.mentorEffectiveness.reduce((sum, m) => sum + m.newConverts, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Total Converts</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-warning">
                            {analyticsData.mentorEffectiveness.reduce((sum, m) => sum + m.foundationCompleters, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Foundation Completers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-info">
                            {mentors.length}
                        </div>
                        <div className="text-sm text-gray-600">Active Mentors</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
