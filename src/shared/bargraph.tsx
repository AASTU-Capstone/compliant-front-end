import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarGraphProps {
  data: Array<{ name: string, value: number }>;
}

const BarGraph: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalCount" fill="#8884d8" />
        <Bar dataKey="mitigatedCount" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
