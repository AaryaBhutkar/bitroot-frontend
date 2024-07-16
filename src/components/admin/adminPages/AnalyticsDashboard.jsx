import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import axiosInstance from '../../utils/axiosInstance';
import useMediaQuery from '@mui/material/useMediaQuery';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    task_metrics: {},
    rejected: "",
    leaderboard: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axiosInstance.post('dash/getAnalytics', {});
        setAnalyticsData(response.data.data[0]);
        console.log('Fetched data:', response.data.data[0]);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setError('Failed to fetch analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '1rem', color: 'red' }}>{error}</div>;
  }

  const { task_metrics, rejected, leaderboard, yoe } = analyticsData;

  const topMetrics = [
    { label: 'EVALUATORS', value: leaderboard.length },
    { label: 'APPROVED TASK', value: task_metrics.assigned },
    { label: 'COMPLETED TASK', value: task_metrics.completed },
    { label: 'TASK IN PROGRESS', value: task_metrics.in_progress },
    { label: 'DENIED TASK', value: parseInt(rejected) },
    { label: 'ACTIVE USERS', value: leaderboard.length },
  ];

  const taskCompletedData = leaderboard.slice(0, 8).map(item => ({
    name: item.name,
    value: item.completed
  }));

  const yearsOfExperienceData = yoe.map(item => ({
    name: item.yoe || "not given",
    value: item.count
  }));

  const renderPieChart = (data, title) => (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.375rem', padding: '1rem' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{title}</div>
      <div style={{ height: '400px', width: '100%' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div>No data available for pie chart</div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {topMetrics.map((metric, index) => (
          <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '0.375rem', padding: '1rem' }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{metric.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
        {renderPieChart(taskCompletedData, 'MOST TASK COMPLETED')}
        {renderPieChart(yearsOfExperienceData, 'YEARS OF EXPERIENCE')}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
