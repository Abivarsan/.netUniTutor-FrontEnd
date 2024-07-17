import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import "./Charts.scss";
import { Typography } from "@mui/material";

interface ChartData {
  month: string;
  students: number;
  tutors: number;
}

const Charts: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5025/api/ChartData/monthly")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching chart data:", error));
  }, []);

  const modifiedData = data.map(({ month, students, tutors }) => ({
    name: month,
    Students: students,
    Tutors: tutors,
    Users: students + tutors,
  }));

  return (
    <div className="charts">
        <Typography variant="h4">
          <h2>CHARTS</h2>
          </Typography>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={modifiedData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Users"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="Tutors"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="Students"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
