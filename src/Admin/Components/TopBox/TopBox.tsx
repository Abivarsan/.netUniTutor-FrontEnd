import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopBox.scss";
import CustomAvatar from "../../Components/Avatar/CustomAvatar";
interface User {
  id: number;
  fullName: string;
  email: string;
  profileUrl: string;
  type: string;

}

const TopBox: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5025/api/LastJoined/last-joined?count=6");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching last joined users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="topBox">
      <h1>Last Joined</h1>
      <div className="list">
        {users.map((user) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <CustomAvatar
                name={user.fullName}
                src={user.profileUrl}
              />
              <div className="userTexts">
                <span className="username">{user.fullName}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="email">{user.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
