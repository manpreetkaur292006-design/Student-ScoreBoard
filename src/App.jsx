import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Aman", score: 78 },
    { id: 2, name: "Riya", score: 45 },
    { id: 3, name: "Karan", score: 90 },
    { id: 4, name: "Neha", score: 32 },
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const addStudent = () => {
    if (!name || score === "") return;

    const newStudent = {
      id: Date.now(),
      name,
      score: Number(score),
    };

    setStudents([...students, newStudent]);

    setName("");
    setScore("");
  };

  const updateScore = (id, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, score: Number(value) }
          : student
      )
    );
  };

  const total = students.length;

  const passed = students.filter(
    (student) => student.score >= 40
  ).length;

  const average =
    total > 0
      ? Math.round(
          students.reduce((acc, curr) => acc + curr.score, 0) /
            total
        )
      : 0;

  return (
    <div className="app">
      <div className="overlay"></div>

      <div className="container">

        <p className="sub-title">ACADEMIC TERMINAL V2.0</p>

        <h1 className="title">
          STUDENT <span>SCOREBOARD</span>
        </h1>

        <div className="form-box">
          <div className="form-top">
            <p>● REGISTER STUDENT</p>
            <p>NEW ENTRY</p>
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Score (0-100)"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />

            <button onClick={addStudent}>+ ADD</button>
          </div>
        </div>

        <div className="stats">
          <div className="card">
            <p>TOTAL</p>
            <h2>{total}</h2>
          </div>

          <div className="card active">
            <p>PASSED</p>
            <h2>{passed}</h2>
          </div>

          <div className="card">
            <p>AVG SCORE</p>
            <h2>{average}</h2>
          </div>
        </div>

        <div className="table">
          <div className="table-top">
            <p>STUDENT RECORDS</p>
            <p>{students.length} entries</p>
          </div>

          <div className="table-head">
            <p>NAME</p>
            <p>SCORE</p>
            <p>STATUS</p>
            <p>UPDATE</p>
          </div>

          {students.map((student) => {
            const isPass = student.score >= 40;

            return (
              <div className="table-row" key={student.id}>
                <div className="name-box">
                  <div
                    className={
                      isPass ? "line pass" : "line fail"
                    }
                  ></div>

                  <p>{student.name}</p>
                </div>

                <h3>{student.score}</h3>

                <div>
                  <span
                    className={
                      isPass
                        ? "status pass-status"
                        : "status fail-status"
                    }
                  >
                    ● {isPass ? "PASS" : "FAIL"}
                  </span>
                </div>

                <div className="update-box">
                  <input
                    type="number"
                    value={student.score}
                    onChange={(e) =>
                      updateScore(student.id, e.target.value)
                    }
                  />

                  <button>SAVE</button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="footer">
          ACADEMIC TERMINAL — SECURE SESSION
        </p>
      </div>
    </div>
  );
}

export default App;