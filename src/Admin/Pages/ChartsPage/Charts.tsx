import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import "./Charts.scss";
  
  const data = [
    {
      name: "Sun",
      Students: 400,
      Tutors: 240,
    },
    {
      name: "Mon",
      Students: 300,
      Tutors: 139,
    },
    {
      name: "Tue",
      Students: 200,
      Tutors: 280,
    },
    {
      name: "Wed",
      Students: 278,
      Tutors: 390,
    },
    {
      name: "Thu",
      Students: 189,
      Tutors: 480,
    },
    {
      name: "Fri",
      Students: 239,
      Tutors: 380,
    },
    {
      name: "Sat",
      Students: 349,
      Tutors: 430,
    },
  ];
  
  // Modify the data to include "Users" as the sum of "Students" and "Tutors"
  const modifiedData = data.map(({ name, Students, Tutors }) => ({
    name,
    Students,
    Tutors,
    Users: Students + Tutors,
  }));
  
  const Charts = () => {
    return (
      <div className="charts">
        <h1>Charts</h1>
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
  