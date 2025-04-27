import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [task, setTask] = useState([]);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [isDeleted, setIsDeleted] = useState(null);

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
  }, [text, isDeleted]);
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
      setIsDeleted(id);
      console.log(deletedTask);
    } catch (e) {
      console.log(`${e}`);
    }
  };

  return (
    <>
      <p>Note app</p>
      <form onSubmit={addTask}>
        <input
          type="text"
          name="name"
          value={text}
          placeholder="Enter Text"
          onChange={(e) => setText(e.target.value)}
        />
        {/* <button>Add task</button> */}

        <button>{isEditing !== null ? "Update" : "Add Task"}</button>
      </form>
      {/* {task.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))} */}
      <ol>
        {task.map((item, index) => (
          <li key={item._id || index}>
            {item.name}
            <button onClick={() => editFunc(item._id)}>Edit</button>
            <button onClick={() => deleteTask(item._id)}>Delete</button>
          </li>
        ))}
      </ol>
    </>
  );
  x;
};

export default App;
