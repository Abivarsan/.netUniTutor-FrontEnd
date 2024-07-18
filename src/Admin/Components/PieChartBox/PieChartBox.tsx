import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./PieChartBox.scss";
import CountUp from "react-countup";  

type DataItem = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: DataItem[];
};

const PieChartBox: React.FC<Props> = ({ data }) => {
  return (
    <div className="pieChartBox">
      <h1>CURRENT USERS</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{}
            <CountUp
            start={0}
            end={typeof item.value === 'number' ? item.value : parseFloat(item.value)}
            duration={2.5}
            delay={1}
          // prefix="$"
          // suffix=" USD"
          // decimals={2}
          separator=","
          />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
