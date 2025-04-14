import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import quoteList from "../utils/quotes.js";
import { handleLogout } from "../utils/Logout.js";
import Layout from "../Layout1/Layout.jsx";
import Navbar from "../Layout1/Navbar.jsx";
import { createroom, joinroom } from "../Rooms/room.jsx";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL);

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [quote, setQuote] = useState("");
  const [showmenu, setshowmenu] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQuote(quoteList[Math.floor(Math.random() * quoteList.length)]);
  }, []);

  useEffect(() => {
    const fetchExcel = async () => {
      const response = await fetch("/questions.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setQuestions(data);
      fetchResponse();
    };
    fetchExcel();
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulseGlow {
        from {
          box-shadow: 0 0 15px rgba(138, 43, 226, 0.4), 0 0 30px rgba(138, 43, 226, 0.2);
        }
        to {
          box-shadow: 0 0 500px rgba(138, 43, 226, 0.7), 0 0 60px rgba(138, 43, 226, 0.4);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleCreateRoom = () => createroom(navigate);

  const handleJoinRoom = () => {
    if (!joinRoomId) {
      alert("Please enter a Room ID!");
      return;
    }
    joinroom(joinRoomId, navigate);
  };

  const handleUpdateQuestion = async (index, field, value) => {
    const updatedQuestions = [...questions];
    const newValue = value === "Yes" ? "No" : "Yes";
    try {
      const response = await axios.post(
        process.env.REACT_APP_UPDATE_QUESTION_URI,
        {
          questionId: updatedQuestions[index].Title,
          field,
          value: newValue,
        },
        { withCredentials: true }
      );
      updatedQuestions[index][field] = newValue;
      setQuestions(updatedQuestions);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResponse = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_FETCH_DASHBOARD, {
        withCredentials: true,
      });
      const { importantQuestions, revisionQuestions } = response.data;

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          const isImportant = importantQuestions.some(
            (iq) => iq.questionId === q.Title
          );
          const isRevision = revisionQuestions.some(
            (rq) => rq.questionId === q.Title
          );
          return {
            ...q,
            Important: isImportant ? "Yes" : "No",
            Revision: isRevision ? "Yes" : "No",
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    setshowmenu(false);
    handleLogout(navigate);
  };

  const handleToggleMenu = () => {
    setshowmenu(!showmenu);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleJoinQuestionRoom = (title) => {
    const publicroomID = slugify(title);
    navigate(`/questionroom/${publicroomID}`);
  };

  return (
    <Layout>
      <Navbar
        showMenu={showmenu}
        onToggleMenu={handleToggleMenu}
        onLogout={handleLogoutClick}
        onDashboard={handleNavigateToDashboard}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", padding: "2px" }}>
        <button onClick={handleCreateRoom} style={buttonStyle}>Create Room</button>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleJoinRoom} style={buttonStyle}>Join Room</button>
          <button onClick={() => navigate("/follow-dashboard")} style={buttonStyle}>Follow Dashboard</button>
          <button onClick={() => navigate("/upload-post")} style={buttonStyle}>Upload Post</button>
        </div>
      </div>

      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "150px", marginBottom: "30px" }}>
        {quote}
      </h1>

      <div style={tableContainerStyle}>
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>DSA Questions</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "black" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Difficulty</th>
              <th style={thStyle}>Revision</th>
              <th style={thStyle}>Important</th>
              <th style={thStyle}>Actions</th>
              <th style={thStyle}>Join Room</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={index}>
                <td style={tdStyle}>{q.Title}</td>
                <td style={tdStyle}>{q.Difficulty}</td>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={q.Revision === "Yes"}
                    onChange={() => handleUpdateQuestion(index, "Revision", q.Revision)}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={q.Important === "Yes"}
                    onChange={() => handleUpdateQuestion(index, "Important", q.Important)}
                  />
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleUpdateQuestion(index, "Revision", q.Revision)}
                    style={actionBtnStyle1}
                  >
                    Toggle Revision
                  </button>
                  <button
                    onClick={() => handleUpdateQuestion(index, "Important", q.Important)}
                    style={actionBtnStyle2}
                  >
                    Toggle Important
                  </button>
                </td>
                <td style={tdStyle}>
                  <button onClick={() => handleJoinQuestionRoom(q.Title)} style={buttonStyle}>
                    Join Room
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

// --- Styles ---

const buttonStyle = {
  backgroundColor: "#1a1a1a",
  padding: "10px 20px",
  color: "white",
  border: "1px solid violet",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 0 8px rgba(138, 43, 226, 0.3)",
};

const inputStyle = {
  backgroundColor: "#1a1a1a",
  color: "white",
  border: "1px solid violet",
  borderRadius: "8px",
  padding: "10px",
  outline: "none",
};

const tableContainerStyle = {
  background: "rgba(73, 21, 217, 0.2)",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  marginBottom: "290px",
  marginTop: "40px",
  animation: "pulseGlow 3s infinite alternate",
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  color: "white",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  color: "white",
};

const actionBtnStyle1 = {
  marginRight: "10px",
  padding: "6px",
  borderRadius: "6px",
  border: "none",
  background: "#5f27cd",
  color: "white",
  cursor: "pointer",
};

const actionBtnStyle2 = {
  padding: "6px",
  borderRadius: "6px",
  border: "none",
  background: "#341f97",
  color: "white",
  cursor: "pointer",
};

export default Dashboard;