import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F0F0F0", // custom blue
      contrastText: "#fff",
    },
  },
});

const App = () => {
  const [task, setTask] = useState([]);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  // const [isDeleted, setIsDeleted] = useState(null);

  // const addTask = async (e) => {
  //   e.preventDefault();
  //   if (text.trim() !== "") {
  //     if (isEditing !== null) {
  //       const updateTask = task.map((item, index) =>
  //         index === isEditing ? text : item
  //       );

  //       setTask(updateTask);
  //       setIsEditing(null);
  //       setText("");
  //     } else {
  //       setTask([...task, text]);
  //       setText("");
  //     }
  //   } else {
  //     alert("field should not be empty");
  //   }

  //   await axios.post("http://localhost:8000/listnote", { text });
  // };

  // useEffect(() => {
  //   const storeTask = localStorage.getItem("todoTask");
  //   if (storeTask) {
  //     setTask(JSON.parse(storeTask));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (task.length > 0) {
  //     localStorage.setItem("todoTask", JSON.stringify(task));
  //   }
  // }, [task]);

  // Edit function //
  // const editFunc = (index) => {
  //   alert(task.find((_, i) => i == index));
  //   setText(task[index].name);
  //   console.log(task[index].name);
  //   setIsEditing(index);
  // };

  // Delete function //
  // const deleteTask = (index) => {
  //   setTask(task.filter((_, i) => i !== index));
  //   // setTask(updateTask);
  // };

  // Retrieve Data //
  useEffect(() => {
    const Items = async () => {
      try {
        const lists = await axios.get(
          "https://noteapp-ffoq.onrender.com/getItem"
        );
        const data = lists.data;
        console.log(data);
        setTask(data);
      } catch (e) {
        console.log(`${e}`);
      }
    };
    Items();
  }, [text]);
  //Adding and Updating task//
  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        //https://noteapp-ffoq.onrender.com/
        //http://localhost:8000
        await axios.put(
          `https://noteapp-ffoq.onrender.com/editList/${isEditing}`,
          {
            name: text,
          }
        );
        setIsEditing(null);
        setText("");
      } else {
        await axios.post("https://noteapp-ffoq.onrender.com/listnote", {
          name: text,
        });
        setText("");
      }
    } catch (e) {
      console.log(`${e}`);
    }
  };

  // Edit Item //
  const editFunc = async (id) => {
    try {
      const jj = await axios.get(
        `https://noteapp-ffoq.onrender.com/editList/${id}`
      );
      const data = jj.data;
      setText(data.name);
      setIsEditing(id);
      console.log(data);
    } catch (e) {
      console.log(`${e}`);
    }
  };

  //Delete section//
  const deleteTask = async (id) => {
    try {
      const deletedTask = axios.delete(
        `https://noteapp-ffoq.onrender.com/deleteTask/${id}`
      );
      setTask((task) => task.filter((item) => item._id !== id));
      // setIsDeleted(id);
      console.log(deletedTask);
    } catch (e) {
      console.log(`${e}`);
    }
  };

  return (
    <>
      <div className="note flex justify-center w-full ">
        <p className="text-white font-800 text-[25px] tracking-1 pt-6 ">
          Note App
        </p>
      </div>
      <div className=" flex items-center justify-center h-screen w-full">
        <div className="">
          <form>
            <ThemeProvider theme={theme}>
              <TextField
                id="standard-basic"
                label="Take a note......"
                variant="standard"
                type="text"
                name="name"
                value={text}
                onChange={(e) => setText(e.target.value)}
                color="primary"
                sx={{
                  "& label": {
                    color: "#fff", // Before focus
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#fff", // Default underline
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: "#E6E6E6", // Hover (not focused)
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#fff", // Focus underline
                  },
                  "& input": {
                    color: "	#fff", // Text color
                  },
                }}
              />
            </ThemeProvider>
            {/* <button>Add task</button> */}

            {/* <button>{isEditing !== null ? "Update" : "Add Task"}</button> */}
            <span className="mr-6" />
            <ThemeProvider theme={theme}>
              <Button color="primary" variant="text" onClick={addTask}>
                {isEditing !== null ? "Update" : "Add Task"}
              </Button>
            </ThemeProvider>
          </form>

          {/* {task.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))} */}
          <ol style={{ listStyleType: "decimal" }} className="mt-6">
            {task.map((item, index) => (
              <li key={item._id || index}>
                {item.name}
                <span className="mr-12  " />
                <ThemeProvider theme={theme}>
                  <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button color="primary" onClick={() => editFunc(item._id)}>
                      Edit
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => deleteTask(item._id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </ThemeProvider>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
  x;
};

export default App;
