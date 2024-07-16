// // import React from "react";
// // import { LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts";
// // import "./ChartBox.scss";
// // import { Link } from "react-router-dom";

// // type Props = {
// //   color: string;
// //   icon: string;
// //   title: string;
// //   number: number | string;
// //   dataKey: string; // Make sure this matches the dataKey used in Line component
// //   percentage: number;
// //   chartData: { day: string; count: number }[];
// // };

// // export const ChartBox = (props: Props) => {
// //   return (
// //     <div className="chartBox">
// //       <div className="boxInfo">
// //         <div className="title">
// //           <img src={props.icon} alt="" />
// //           <span>{props.title}</span>
// //         </div>
// //         <h1>{props.number}</h1>
// //         <Link to="/" style={{ color: props.color }}>
// //           View all
// //         </Link>
// //       </div>
// //       <div className="chartInfo">
// //         <div className="chart">
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={props.chartData}>
// //               <XAxis dataKey="day" /> {/* Ensure XAxis dataKey matches your data structure */}
// //               <YAxis />
// //               <Tooltip
// //                 contentStyle={{ background: "transparent", border: "none" }}
// //                 labelStyle={{ display: "none" }}
// //                 position={{ x: 10, y: 60 }}
// //               />
// //               <Line
// //                 type="monotone"
// //                 dataKey={props.dataKey} {/* Use props.dataKey here */}
// //                 stroke={props.color}
// //                 strokeWidth={2}
// //                 dot={false}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //         <div className="texts">
// //           <span
// //             className="percentage"
// //             style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
// //           >
// //             {props.percentage}%
// //           </span>
// //           <span className="duration">Last 7 days</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // ChartBox.tsx

// import React from "react";
// import { LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts";
// import { Link } from "react-router-dom";
// import "./ChartBox.scss";

// interface Props {
//   color: string;
//   icon: string;
//   title: string;
//   number: number | string;
//   dataKey: string;
//   percentage: number;
//   chartData: { day: string; count: number }[];
// }

// const ChartBox: React.FC<Props> = (props) => {
//   console.log(props);
//   return (
//     <div className="chartBox">
//       <div className="boxInfo">
//         <div className="title">
//           <img src={props.icon} alt="" />
//           <span>{props.title}</span>
//         </div>
//         <h1>{props.number}</h1>
//         <Link to="/" style={{ color: props.color }}>
//           View all
//         </Link>
//       </div>
//       <div className="chartInfo">
//         <div className="chart">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={props.chartData}>
//               <Tooltip
//                 contentStyle={{ background: "transparent", border: "none" }}
//                 labelStyle={{ display: "none" }}
//                 position={{ x: 10, y: 60 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey={props.dataKey}
//                 stroke={props.color}
//                 strokeWidth={3}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="texts">
//           <span
//             className="percentage"
//             style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
//           >
//             {props.percentage}%
//           </span>
//           <span className="duration">Last 7 days</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartBox;


import React from "react";
import { LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts";
import { Link } from "react-router-dom";
import "./ChartBox.scss";

interface Props {
  color: string;
  icon: string;
  title: string;
  number: number | string;
  dataKey: string;
  percentage: number;
  chartData: { day: string; count: number }[];
  viewAllLink: string; // Add viewAllLink prop
}

const ChartBox: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link to={props.viewAllLink} style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 60 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="duration">Last 7 days</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
