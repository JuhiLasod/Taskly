import React, { useCallback, useEffect, useState } from "react";

function UserDash() {
  const [add, setAdd] = useState(false);
  const [task, setTask] = useState("");
  const [duedate, setDuedate] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState("");

  const email = localStorage.getItem("email");

  const fetchTasks = useCallback(async () => {
    const res = await fetch("https://taskly-backend-62oq.onrender.com/api/auth/loadtask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const tasks = await res.json();
    setData(tasks);
  }, [email]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = async () => {
    const res = await fetch("https://taskly-backend-62oq.onrender.com/api/auth/addtask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, task, duedate }),
    });
    const text = await res.text();
    alert(text);
    fetchTasks();
    setAdd(false);
    setTask("");
    setDuedate("");
  };

  const handleDelete = async (_id) => {
    const c = "2";
    const result = window.confirm("Are you sure you want to delete this task?");
    if (result) {
      const res = await fetch("https://taskly-backend-62oq.onrender.com/api/auth/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, email, choice: c }),
      });
      const text = await res.text();
      fetchTasks();
      if (text !== "success") {
        alert("successfully deleted");
        console.log("Task deleted");
      }
    } else {
      console.log("deletion cancelled");
    }
  };

  const handleEditStatus = async (_id) => {
    const c = "1";
    const result = window.confirm("are you sure you want to update the task status?");
    if (result) {
      const res = await fetch("https://taskly-backend-62oq.onrender.com/api/auth/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, email, choice: c }),
      });
      const text = await res.text();
      fetchTasks();
      if (text !== "success") {
        alert("status successfully updated to completed");
        console.log("updated");
      }
    } else {
      console.log("updation cancelled");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      background: "linear-gradient(135deg, #f472b6, #fcd34d)",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: "25px",
      padding: "30px",
      maxWidth: "600px",
      width: "100%",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
    },
    heading: {
      fontSize: "28px",
      color: "#7e22ce",
      marginBottom: "20px",
      fontWeight: "bold",
      textAlign: "center",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      fontWeight: "600",
      marginBottom: "5px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      background: "linear-gradient(to right, #9333ea, #ec4899)",
      border: "none",
      color: "white",
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "600",
      borderRadius: "20px",
      cursor: "pointer",
      margin: "5px",
    },
    taskCard: {
      backgroundColor: "#f9fafb",
      borderRadius: "15px",
      padding: "15px",
      margin: "10px 0",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    taskTitle: {
      fontWeight: "bold",
    },
    status: {
      marginTop: "5px",
      marginBottom: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📋 Your Task Dashboard</h2>

        <button style={styles.button} onClick={() => setAdd(true)}>➕ Add Task</button>

        {add && (
          <div style={{ marginTop: "20px" }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Task Name</label>
              <input
                style={styles.input}
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Due Date</label>
              <input
                style={styles.input}
                type="date"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
              />
            </div>

            <button style={styles.button} onClick={handleAdd}>✅ Add Task</button>
          </div>
        )}

        <div style={{ marginTop: "30px" }}>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((t, i) => (
              <div key={i} style={styles.taskCard}>
                <div style={styles.taskTitle}>{t.task} - Due: {new Date(t.duedate).toLocaleDateString()}</div>
                <div style={styles.status}>Status: {t.status ? "✅ Done" : "❌ Pending"}</div>
                <button style={styles.button} onClick={() => setEdit(i)}>⚙️ Edit</button>
                {edit === i && (
                  <div>
                    <button style={styles.button} onClick={() => handleDelete(t._id)}>🗑️ Delete</button>
                    {!t.status && (
                      <button style={styles.button} onClick={() => handleEditStatus(t._id)}>✔️ Mark as Done</button>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDash;
