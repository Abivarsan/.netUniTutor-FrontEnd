
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import ChartBox from "../../Components/ChartBox/ChartBox";
// // // import PieChartBox from "../../Components/PieChartBox/PieChartBox";
// // // import BarChartBox from "../../Components/BarChartBox/BarChartBox";
// // // import TopBox from "../../Components/TopBox/TopBox";
// // // import "./Home.scss";

// // // interface DataItem {
// // //   day: string;
// // //   count: number;
// // // }

// // // interface PieDataItem {
// // //   name: string;
// // //   value: number;
// // //   color: string;
// // // }

// // // const Home: React.FC = () => {
// // //   const [studentData, setStudentData] = useState<DataItem[]>([]);
// // //   const [tutorData, setTutorData] = useState<DataItem[]>([]);
// // //   const [requestData, setRequestData] = useState<DataItem[]>([]);
// // //   const [commentData, setCommentData] = useState<DataItem[]>([]);
// // //   const [totalStudents, setTotalStudents] = useState<number>(0);
// // //   const [totalTutors, setTotalTutors] = useState<number>(0);
// // //   const [pieData, setPieData] = useState<PieDataItem[]>([]);


// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const studentResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-joined-students");
// // //         setStudentData(studentResponse.data);
// // //         const tutorResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-joined-tutors");
// // //         setTutorData(tutorResponse.data);
// // //         const commentResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-comments");
// // //         setCommentData(commentResponse.data);
// // //         const totalStudentsResponse = await axios.get<number>("http://localhost:5025/api/Analytics/weekly-joined-students");
// // //         setTotalStudents(totalStudentsResponse.data);
// // //         const totalTutorsResponse = await axios.get<number>("http://localhost:5025/api/CurrentUsersTotal/total-tutors");
// // //         setTotalTutors(totalTutorsResponse.data);
// // //         const requestResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-tutor-requests");
// // //        setRequestData(requestResponse.data);
// // //         // const visitResponse = await axios.get<DataItem[]>("https://localhost:7248/api/Analytics/last-seven-days-visits");
// // //         // setVisitData(visitResponse.data);
// // //         const pieData = [
// // //           { name: "Students", value: totalStudentsResponse.data, color: "#1739E3" },
// // //           { name: "Tutors", value: totalTutorsResponse.data, color: "#ee4d2f" },
// // //         ];
// // //         setPieData(pieData);
// // //       } catch (error) {
// // //         console.error("Error fetching data", error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   // Helper function to calculate the percentage change
// // //   const calculatePercentage = (data: DataItem[]): number => {
// // //     if (data.length < 8) return 0; // Ensure there is data for at least 8 days to calculate percentage change
// // //     const lastSevenDays = data.slice(-7).reduce((acc, day) => acc + day.count, 0);
// // //     const previousSevenDays = data.slice(-14, -7).reduce((acc, day) => acc + day.count, 0);
// // //     const percentageChange = ((lastSevenDays - previousSevenDays) / previousSevenDays) * 100;
// // //     return parseFloat(percentageChange.toFixed(2));
// // //   };

// // //   return (
// // //     <div className="home">
// // //       <div className="box box1">
// // //         <TopBox />
// // //       </div>
// // //       <div className="box box2">
// // //         <ChartBox
// // //           color="black"
// // //           icon="student.png"
// // //           title="Students Joined"
// // //           number={studentData.reduce((acc, curr) => acc + curr.count, 0)}
// // //           dataKey="count"
// // //           percentage={calculatePercentage(studentData)}
// // //           chartData={studentData.map(item => ({ day: item.day, count: item.count }))}
// // //         />
// // //       </div>
// // //       <div className="box box3">
// // //         <ChartBox
// // //           color="purple"
// // //           icon="/icons/tutor.png"
// // //           title="Tutors Joined"
// // //           number={tutorData.reduce((acc, curr) => acc + curr.count, 0)}
// // //           dataKey="count"
// // //           percentage={calculatePercentage(tutorData)}
// // //           chartData={tutorData.map(item => ({ day: item.day, count: item.count }))}
// // //         />
// // //       </div>
// // //       <div className="box box4">
// // //       <PieChartBox data={pieData} />
// // //       </div>
// // //       <div className="box box5">
// // //         <ChartBox
// // //           color="#2C550B"
// // //           icon="/icons/request.png"
// // //           title="Tutor Requests"
// // //           number={requestData.reduce((acc, curr) => acc + curr.count, 0)}
// // //           dataKey="count"
// // //           percentage={calculatePercentage(requestData)}
// // //           chartData={requestData.map(item => ({ day: item.day, count: item.count }))}
// // //         />
// // //       </div>
// // //       <div className="box box6">
// // //         <ChartBox
// // //           color="#66490B"
// // //           icon="/icons/comment.png"
// // //           title="Comments"
// // //           number={commentData.reduce((acc, curr) => acc + curr.count, 0)}
// // //           dataKey="count"
// // //           percentage={calculatePercentage(commentData)}
// // //           chartData={commentData.map(item => ({ day: item.day, count: item.count }))}
// // //         />
// // //       </div>
// // //       {/* <div className="box box7">
// // //         <BarChartBox
// // //           color="#8884d8"
// // //           title="Visits"
// // //           dataKey="count"
// // //           chartData={visitData.map(item => ({ day: item.day, count: item.count }))}
// // //         />
// // //       </div> */}
// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import ChartBox from "../../Components/ChartBox/ChartBox";
// // import PieChartBox from "../../Components/PieChartBox/PieChartBox";
// // import BarChartBox from "../../Components/BarChartBox/BarChartBox";
// // import TopBox from "../../Components/TopBox/TopBox";
// // import "./Home.scss";

// // interface DataItem {
// //   day: string;
// //   count: number;
// // }

// // interface PieDataItem {
// //   name: string;
// //   value: number;
// //   color: string;
// // }

// // const Home: React.FC = () => {
// //   const [studentData, setStudentData] = useState<DataItem[]>([]);
// //   const [tutorData, setTutorData] = useState<DataItem[]>([]);
// //   const [requestData, setRequestData] = useState<DataItem[]>([]);
// //   const [commentData, setCommentData] = useState<DataItem[]>([]);
// //   const [totalStudents, setTotalStudents] = useState<number>(0);
// //   const [totalTutors, setTotalTutors] = useState<number>(0);
// //   const [pieData, setPieData] = useState<PieDataItem[]>([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const studentResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-joined-students");
// //         setStudentData(studentResponse.data);

// //         const tutorResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-joined-tutors");
// //         setTutorData(tutorResponse.data);

// //         const commentResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-comments");
// //         setCommentData(commentResponse.data);

// //         const totalStudentsResponse = await axios.get<number>("http://localhost:5025/api/CurrentUsersTotal/total-students");
// //         setTotalStudents(totalStudentsResponse.data);

// //         const totalTutorsResponse = await axios.get<number>("http://localhost:5025/api/CurrentUsersTotal/total-tutors");
// //         setTotalTutors(totalTutorsResponse.data);

// //         const requestResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-tutor-requests");
// //         setRequestData(requestResponse.data);

// //         const pieData = [
// //           { name: "Students", value: totalStudentsResponse.data, color: "#1739E3" },
// //           { name: "Tutors", value: totalTutorsResponse.data, color: "#ee4d2f" },
// //         ];
// //         setPieData(pieData);
// //       } catch (error) {
// //         console.error("Error fetching data", error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Helper function to calculate the percentage change
// //   const calculatePercentage = (data: DataItem[]): number => {
// //     if (data.length < 8) return 0; // Ensure there is data for at least 8 days to calculate percentage change
// //     const lastSevenDays = data.slice(-7).reduce((acc, day) => acc + day.count, 0);
// //     const previousSevenDays = data.slice(-14, -7).reduce((acc, day) => acc + day.count, 0);
// //     const percentageChange = ((lastSevenDays - previousSevenDays) / previousSevenDays) * 100;
// //     return parseFloat(percentageChange.toFixed(2));
// //   };

// //   return (
// //     <div className="home">
// //       <div className="box box1">
// //         <TopBox />
// //       </div>
// //       <div className="box box2">
// //         <ChartBox
// //           color="black"
// //           icon="student.png"
// //           title="Students Joined"
// //           number={studentData.reduce((acc, curr) => acc + curr.count, 0)}
// //           dataKey="count"
// //           percentage={calculatePercentage(studentData)}
// //           chartData={studentData.map(item => ({ day: item.day, count: item.count }))}
// //         />
// //       </div>
// //       <div className="box box3">
// //         <ChartBox
// //           color="purple"
// //           icon="/icons/tutor.png"
// //           title="Tutors Joined"
// //           number={tutorData.reduce((acc, curr) => acc + curr.count, 0)}
// //           dataKey="count"
// //           percentage={calculatePercentage(tutorData)}
// //           chartData={tutorData.map(item => ({ day: item.day, count: item.count }))}
// //         />
// //       </div>
// //       <div className="box box4">
// //         <PieChartBox data={pieData} />
// //       </div>
// //       <div className="box box5">
// //         <ChartBox
// //           color="#2C550B"
// //           icon="/icons/request.png"
// //           title="Tutor Requests"
// //           number={requestData.reduce((acc, curr) => acc + curr.count, 0)}
// //           dataKey="count"
// //           percentage={calculatePercentage(requestData)}
// //           chartData={requestData.map(item => ({ day: item.day, count: item.count }))}
// //         />
// //       </div>
// //       <div className="box box6">
// //         <ChartBox
// //           color="#66490B"
// //           icon="/icons/comment.png"
// //           title="Comments"
// //           number={commentData.reduce((acc, curr) => acc + curr.count, 0)}
// //           dataKey="count"
// //           percentage={calculatePercentage(commentData)}
// //           chartData={commentData.map(item => ({ day: item.day, count: item.count }))}
// //         />
// //       </div>
// //       {/* <div className="box box7">
// //         <BarChartBox
// //           color="#8884d8"
// //           title="Visits"
// //           dataKey="count"
// //           chartData={visitData.map(item => ({ day: item.day, count: item.count }))}
// //         />
// //       </div> */}
// //     </div>
// //   );
// // };

// // export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Skeleton, Box } from "@mui/material";
// import ChartBox from "../../Components/ChartBox/ChartBox";
// import PieChartBox from "../../Components/PieChartBox/PieChartBox";
// import BarChartBox from "../../Components/BarChartBox/BarChartBox";
// import TopBox from "../../Components/TopBox/TopBox";
// import "./Home.scss";

// interface DataItem {
//   day: string;
//   count: number;
// }

// interface PieDataItem {
//   name: string;
//   value: number;
//   color: string;
// }

// const Home: React.FC = () => {
//   const [studentData, setStudentData] = useState<DataItem[]>([]);
//   const [tutorData, setTutorData] = useState<DataItem[]>([]);
//   const [requestData, setRequestData] = useState<DataItem[]>([]);
//   const [commentData, setCommentData] = useState<DataItem[]>([]);
//   const [totalStudents, setTotalStudents] = useState<number>(0);
//   const [totalTutors, setTotalTutors] = useState<number>(0);
//   const [pieData, setPieData] = useState<PieDataItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const studentResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-joined-students");
//         setStudentData(studentResponse.data);

//         const tutorResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-joined-tutors");
//         setTutorData(tutorResponse.data);

//         const commentResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-comments");
//         setCommentData(commentResponse.data);

//         const totalStudentsResponse = await axios.get<number>("http://localhost:5025/api/CurrentUsersTotal/total-students");
//         setTotalStudents(totalStudentsResponse.data);

//         const totalTutorsResponse = await axios.get<number>("http://localhost:5025/api/CurrentUsersTotal/total-tutors");
//         setTotalTutors(totalTutorsResponse.data);

//         const requestResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-tutor-requests");
//         setRequestData(requestResponse.data);

//         const pieData = [
//           { name: "Students", value: totalStudentsResponse.data, color: "#1739E3" },
//           { name: "Tutors", value: totalTutorsResponse.data, color: "#ee4d2f" },
//         ];
//         setPieData(pieData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const calculatePercentage = (data: DataItem[]): number => {
//     if (data.length < 8) return 0; // Ensure there is data for at least 8 days to calculate percentage change
//     const lastSevenDays = data.slice(-7).reduce((acc, day) => acc + day.count, 0);
//     const previousSevenDays = data.slice(-14, -7).reduce((acc, day) => acc + day.count, 0);
//     const percentageChange = ((lastSevenDays - previousSevenDays) / previousSevenDays) * 100;
//     return parseFloat(percentageChange.toFixed(2));
//   };

//   return (
//     <div className="home">
//       <div className="box box1">
//         {loading ? <Skeleton variant="rectangular" width="100%" height="100%" /> : <TopBox />}
//       </div>
//       <div className="box box2">
//         {loading ? (
//           <Skeleton variant="rectangular" width="100%" height="100%" />
//         ) : (
//           <ChartBox
//             color="black"
//             icon="student.png"
//             title="Students Joined"
//             number={studentData.reduce((acc, curr) => acc + curr.count, 0)}
//             dataKey="count"
//             percentage={calculatePercentage(studentData)}
//             chartData={studentData.map(item => ({ day: item.day, count: item.count }))}
//           />
//         )}
//       </div>
//       <div className="box box3">
//         {loading ? (
//           <Skeleton variant="rectangular" width="100%" height="100%" />
//         ) : (
//           <ChartBox
//             color="purple"
//             icon="/icons/tutor.png"
//             title="Tutors Joined"
//             number={tutorData.reduce((acc, curr) => acc + curr.count, 0)}
//             dataKey="count"
//             percentage={calculatePercentage(tutorData)}
//             chartData={tutorData.map(item => ({ day: item.day, count: item.count }))}
//           />
//         )}
//       </div>
//       <div className="box box4">
//         {loading ? <Skeleton variant="rectangular" width="100%" height="100%" /> : <PieChartBox data={pieData} />}
//       </div>
//       <div className="box box5">
//         {loading ? (
//           <Skeleton variant="rectangular" width="100%" height="100%" />
//         ) : (
//           <ChartBox
//             color="#2C550B"
//             icon="/icons/request.png"
//             title="Tutor Requests"
//             number={requestData.reduce((acc, curr) => acc + curr.count, 0)}
//             dataKey="count"
//             percentage={calculatePercentage(requestData)}
//             chartData={requestData.map(item => ({ day: item.day, count: item.count }))}
//           />
//         )}
//       </div>
//       <div className="box box6">
//         {loading ? (
//           <Skeleton variant="rectangular" width="100%" height="100%" />
//         ) : (
//           <ChartBox
//             color="#66490B"
//             icon="/icons/comment.png"
//             title="Comments"
//             number={commentData.reduce((acc, curr) => acc + curr.count, 0)}
//             dataKey="count"
//             percentage={calculatePercentage(commentData)}
//             chartData={commentData.map(item => ({ day: item.day, count: item.count }))}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
import ChartBox from "../../Components/ChartBox/ChartBox";
import PieChartBox from "../../Components/PieChartBox/PieChartBox";
import "./Home.scss";
import TopBox from "../../Components/TopBox/TopBox";

interface DataItem {
  day: string;
  count: number;
}

interface PieDataItem {
  name: string;
  value: number;
  color: string;
}

const Home: React.FC = () => {
  const [studentData, setStudentData] = useState<DataItem[]>([]);
  const [tutorData, setTutorData] = useState<DataItem[]>([]);
  const [requestData, setRequestData] = useState<DataItem[]>([]);
  const [commentData, setCommentData] = useState<DataItem[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalTutors, setTotalTutors] = useState<number>(0);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-joined-students");
        setStudentData(studentResponse.data);

        const tutorResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-joined-tutors");
        setTutorData(tutorResponse.data);

        const commentResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-comments");
        setCommentData(commentResponse.data);

        const totalStudentsResponse = await axios.get<number>("http://localhost:5025/api/CurrentUsersTotal/total-students");
        setTotalStudents(totalStudentsResponse.data);

        const totalTutorsResponse = await axios.get<number>("http://localhost:5025/api/CurrentUsersTotal/total-tutors");
        setTotalTutors(totalTutorsResponse.data);

        const requestResponse = await axios.get<DataItem[]>("http://localhost:5025/api/Analytics/weekly-tutor-requests");
        setRequestData(requestResponse.data);

        const pieData = [
          { name: "Students", value: totalStudentsResponse.data, color: "#1739E3" },
          { name: "Tutors", value: totalTutorsResponse.data, color: "#ee4d2f" },
        ];
        setPieData(pieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculatePercentage = (data: DataItem[]): number => {
    if (data.length < 8) return 0; // Ensure there is data for at least 8 days to calculate percentage change
    const lastSevenDays = data.slice(-7).reduce((acc, day) => acc + day.count, 0);
    const previousSevenDays = data.slice(-14, -7).reduce((acc, day) => acc + day.count, 0);
    const percentageChange = ((lastSevenDays - previousSevenDays) / previousSevenDays) * 100;
    return parseFloat(percentageChange.toFixed(2));
  };

  return (
    <div className="home">
      <div className="box box1">
      {loading ? (
          <div className="box loading">
            <Skeleton variant="rectangular" width="150%" height="100%" />
      </div>
        ) : ( <TopBox /> )}
          </div>
      <div className="box box2">
        {loading ? (
          <div className="box loading">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
        ) : (
          <ChartBox
            color="black"
            icon="student.png"
            title="STUDENTS JOINED"
            number={studentData.reduce((acc, curr) => acc + curr.count, 0)}
            dataKey="count"
            percentage={calculatePercentage(studentData)}
            chartData={studentData.map(item => ({ day: item.day, count: item.count }))}
            viewAllLink="/signin/Admin/charts"
          />
        )}
      </div>
      <div className="box box3">
        {loading ? (
          <div className="box loading">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
        ) : (
          <ChartBox
            color="purple"
            icon="/icons/tutor.png"
            title="TUTORS JOINED"
            number={tutorData.reduce((acc, curr) => acc + curr.count, 0)}
            dataKey="count"
            percentage={calculatePercentage(tutorData)}
            chartData={tutorData.map(item => ({ day: item.day, count: item.count }))}
            viewAllLink="/signin/Admin/charts"
          />
        )}
      </div>
      <div className="box box4">
        {loading ? (
          <div className="box loading">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
        ) : (
          <PieChartBox data={pieData} />
        )}
      </div>
      <div className="box box5">
        {loading ? (
          <div className="box loading">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
        ) : (
          <ChartBox
            color="#2C550B"
            icon="/icons/request.png"
            title="PENDING REQUESTS"
            number={requestData.reduce((acc, curr) => acc + curr.count, 0)}
            dataKey="count"
            percentage={calculatePercentage(requestData)}
            chartData={requestData.map(item => ({ day: item.day, count: item.count }))}
            viewAllLink="/signin/Admin/requests"
          />
        )}
      </div>
      <div className="box box6">
        {loading ? (
          <div className="box loading">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
        ) : (
          <ChartBox
            color="#66490B"
            icon="/icons/comment.png"
            title="COMMENTS"
            number={commentData.reduce((acc, curr) => acc + curr.count, 0)}
            dataKey="count"
            percentage={calculatePercentage(commentData)}
            chartData={commentData.map(item => ({ day: item.day, count: item.count }))}
            viewAllLink="/signin/Admin/comments"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
