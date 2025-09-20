import React from 'react';
import MetricCard from '../UI/MetricCard';
import { Newcomer, Mentor } from '../../types';

interface MetricsDashboardProps {
    newcomers: Newcomer[];
    mentors: Mentor[];
    loading?: boolean;
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
    newcomers,
    mentors,
    loading = false
}) => {
    // Calculate metrics
    const totalNewcomers = newcomers.length;
    const totalMentors = mentors.length;

    // Newcomer status metrics
    const newConverts = newcomers.filter(n => n.newConvert).length;
    const firstTimeGuests = newcomers.filter(n => n.firstTimeGuest).length;
    const secondTimeGuests = newcomers.filter(n => n.secondTimeGuest).length;
    const thirdTimeGuests = newcomers.filter(n => n.thirdTimeGuest).length;

    // Class completion metrics
    const newConvertClass1 = newcomers.filter(n => n.newConvertClass1).length;
    const newConvertClass2 = newcomers.filter(n => n.newConvertClass2).length;
    const membershipClass1 = newcomers.filter(n => n.membershipClass1).length;
    const membershipClass2 = newcomers.filter(n => n.membershipClass2).length;

    // Foundation class metrics
    const foundationClass1 = newcomers.filter(n => n.foundationClass1).length;
    const foundationClass2 = newcomers.filter(n => n.foundationClass2).length;
    const foundationClass3 = newcomers.filter(n => n.foundationClass3).length;
    const foundationClass4 = newcomers.filter(n => n.foundationClass4).length;
    const totalFoundationCompleters = foundationClass4; // Those who completed all 4 classes

    // Leadership and training metrics
    const dreamTeamLeaders = newcomers.filter(n => n.dreamTeamLeader).length;
    const pathfinderCIDS = newcomers.filter(n => n.pathfinderCIDS).length;
    const g4aTraining = newcomers.filter(n => n.g4aTraining).length;

    // Progress metrics
    const activeNewcomers = newcomers.filter(n =>
        n.newConvert || n.firstTimeGuest || n.secondTimeGuest || n.thirdTimeGuest
    ).length;

    const completedFoundation = newcomers.filter(n =>
        n.foundationClass1 && n.foundationClass2 && n.foundationClass3 && n.foundationClass4
    ).length;

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 rounded-lg bg-gray-200">
                                <div className="h-6 w-6 bg-gray-300 rounded"></div>
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Counts */}
            <MetricCard
                title="Total Newcomers"
                value={totalNewcomers}
                icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                }
                color="primary"
                subtitle="All registered newcomers"
            />

            <MetricCard
                title="Total Mentors"
                value={totalMentors}
                icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                }
                color="secondary"
                subtitle="Active mentors"
            />

            {/* Conversion Metrics */}
            <MetricCard
                title="New Converts"
                value={newConverts}
                icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                color="success"
                subtitle={`${totalNewcomers > 0 ? Math.round((newConverts / totalNewcomers) * 100) : 0}% of total`}
            />

            <MetricCard
                title="Active Newcomers"
                value={activeNewcomers}
                icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                }
                color="info"
                subtitle="Currently engaged"
            />

            {/* Class Completion Metrics */}
            <MetricCard
                title="Foundation Completers"
                value={totalFoundationCompleters}
                icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                }
                color="success"
                subtitle="Completed all 4 foundation classes"
            />

            <MetricCard
                title="Pathfinder/CIDS"
                value={pathfinderCIDS}
                icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                }
                color="warning"
                subtitle="Completed Pathfinder training"
            />

            <MetricCard
                title="Dream Team Leaders"
                value={dreamTeamLeaders}
                icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                }
                color="primary"
                subtitle="Leadership positions"
            />

            <MetricCard
                title="G4A Training"
                value={g4aTraining}
                icon={
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                }
                color="info"
                subtitle="Completed G4A training"
            />
        </div>
    );
};

export default MetricsDashboard;
