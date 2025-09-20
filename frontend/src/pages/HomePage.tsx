import React from 'react';
import { Link } from 'react-router-dom';
import { useGetNewcomersQuery, useGetMentorsQuery } from '../services/api';
import MetricsDashboard from '../components/Dashboard/MetricsDashboard';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const HomePage: React.FC = () => {
	const { data: newcomersData, isLoading: newcomersLoading } = useGetNewcomersQuery();
	const { data: mentorsData, isLoading: mentorsLoading } = useGetMentorsQuery();

	const newcomers = newcomersData?.data || [];
	const mentors = mentorsData?.data || [];
	const isLoading = newcomersLoading || mentorsLoading;

	return (
		<div className="space-y-8">
			{/* Welcome Section */}
			<div className="text-center py-8">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl font-bold text-gray-900 mb-6">
						Welcome to Dominion House Legacy Center Admin Dashboard
					</h1>
					<p className="text-xl text-gray-600 mb-8">
						Manage newcomers and mentors for the church community
					</p>
				</div>
			</div>

			{/* Metrics Dashboard */}
			<MetricsDashboard
				newcomers={newcomers}
				mentors={mentors}
				loading={isLoading}
			/>

			{/* Navigation Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
				<div className="card">
					<div className="text-center">
						<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Newcomer Management</h3>
						<p className="text-gray-600 mb-4">
							Add and manage newcomer information, track their progress through various programs.
						</p>
						<Link to="/newcomers">
							<Button variant="primary" className="w-full">
								Manage Newcomers
							</Button>
						</Link>
					</div>
				</div>

				<div className="card">
					<div className="text-center">
						<div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Mentor Management</h3>
						<p className="text-gray-600 mb-4">
							Manage mentor information and assign them to newcomers for guidance and support.
						</p>
						<Link to="/mentors">
							<Button variant="secondary" className="w-full">
								Manage Mentors
							</Button>
						</Link>
					</div>
				</div>

				<div className="card">
					<div className="text-center">
						<div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
						<p className="text-gray-600 mb-4">
							View detailed analytics, charts, and insights about newcomer growth and mentor effectiveness.
						</p>
						<Link to="/analytics">
							<Button variant="outline" className="w-full">
								View Analytics
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
