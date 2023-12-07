import React, { useEffect, useState } from "react";
import "./taskboard.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function TaskBoard() {
  let [tasksList, setTasksList] = useState([]);
  let [dragAnimation, setDragAnimation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://stage-mock.apiwiz.io/v1/tasks", {
          method: "GET",
          headers: {
            "x-tenant": "b8e236df-4b26-49ef-9532-5e43ea0c10a4",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTasksList(data); // assuming data is an array of tasks, adjust accordingly
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    setDragAnimation(e.target.value);
  };
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const onDrop = (e, status) => {
    let id = e.dataTransfer.getData("text");
    const newTasksList = tasksList.filter((task) => {
      if (task.id === parseInt(id)) {
        task.status = status;
      }
      return task;
    });
    setTasksList(newTasksList);
  };
  const taskDataToTaskDiv = (taskItem) => {
    return (
      <div
        className="task-item"
        draggable
        onDragStart={(e) => onDragStart(e, taskItem.id)}
        key={taskItem.id}
      >
        {taskItem.priority === "Urgent" && (
          <span className="priority-urgent">!</span>
        )}
        {taskItem.priority === "High" && (
          <span className="priority-high">
            <FaArrowUp />
          </span>
        )}
        {taskItem.priority === "Medium" && (
          <span className="priority-medium">
            <FaArrowUp />
          </span>
        )}
        {taskItem.priority === "Low" && (
          <span className="priority-low">
            <FaArrowDown />
          </span>
        )}
        {taskItem.priority === "Very Low" && (
          <span className="priority-low">
            <FaArrowDown />
          </span>
        )}
        <span className="task-name">{taskItem.name}</span>
        <span className="task-summary">{taskItem.summary}</span>
        <span className="task-assignee">{taskItem.assignee}</span>
      </div>
    );
  };
  const displayItems = (category, priority) => {
    return tasksList
      .filter((task) => {
        if (task.status === category && task.priority === priority) {
          return task;
        }
      })
      .map((task) => {
        return taskDataToTaskDiv(task);
      });
  };
  return (
    <div className="task-board">
      <span className="text-center">AddTask and Filter Buttons</span>
      <div className="task-categories">
        <div
          className={dragAnimation === "Ready" ? "ready drag-scale" : "ready"}
          value="Ready"
          onDragOver={onDragOver}
          onDrop={(e) => {
            onDrop(e, "Ready");
          }}
        >
          <span className="text-center">Ready</span>
          <div className="task-items">
            <div className="task-items-urgent">
              {displayItems("", "Urgent")}
            </div>
            <div className="task-items-urgent">
              {displayItems("Ready", "Urgent")}
            </div>
            <div className="task-items-high">
              {displayItems("Ready", "High")}
            </div>
            <div className="task-items-medium">
              {displayItems("Ready", "Medium")}
            </div>
            <div className="task-items-low">{displayItems("Ready", "Low")}</div>
            <div className="task-items-verylow">
              {displayItems("", "Very Low")}
            </div>
            <div className="task-items-verylow">
              {displayItems("Ready", "Very Low")}
            </div>
          </div>
        </div>
        <div
          className="in-progress"
          onDragOver={onDragOver}
          onDrop={(e) => {
            onDrop(e, "In Progress");
          }}
        >
          <span className="text-center">In Progress</span>
          <div className="task-items">
            <div className="task-items-urgent">
              {displayItems("In Progress", "Urgent")}
            </div>
            <div className="task-items-high">
              {displayItems("In Progress", "High")}
            </div>
            <div className="task-items-medium">
              {displayItems("In Progress", "Medium")}
            </div>
            <div className="task-items-low">
              {displayItems("In Progress", "Low")}
            </div>
            <div className="task-items-verylow">
              {displayItems("In Progress", "Very Low")}
            </div>
          </div>
        </div>
        <div
          className="testing"
          onDragOver={onDragOver}
          onDrop={(e) => {
            onDrop(e, "Testing");
          }}
        >
          <span className="text-center">Testing</span>
          <div className="task-items">
            <div className="task-items-urgent">
              {displayItems("Testing", "Urgent")}
            </div>
            <div className="task-items-high">
              {displayItems("Testing", "High")}
            </div>
            <div className="task-items-medium">
              {displayItems("Testing", "Medium")}
            </div>
            <div className="task-items-low">
              {displayItems("Testing", "Low")}
            </div>
            <div className="task-items-verylow">
              {displayItems("Testing", "Very Low")}
            </div>
          </div>
        </div>
        <div
          className="completed"
          onDragOver={onDragOver}
          onDrop={(e) => {
            onDrop(e, "Done");
          }}
        >
          <span className="text-center">Completed</span>
          <div className="task-items">
            <div className="task-items-urgent">
              {displayItems("Done", "Urgent")}
            </div>
            <div className="task-items-high">
              {displayItems("Done", "High")}
            </div>
            <div className="task-items-medium">
              {displayItems("Done", "Medium")}
            </div>
            <div className="task-items-low">{displayItems("Done", "Low")}</div>
            <div className="task-items-verylow">
              {displayItems("Done", "Very Low")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskBoard;
