import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT)

function App() {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([])

	const saveTask = (e) => {
		e.preventDefault()
		socket.emit("new_task", task);
		// socket.on('new task', task => {
		// 	setTaskList(taskList => [...taskList, task]);
		// })
		setTask('')
	}

	const changeData = () => {
		socket.emit("initial_data")
	}

	useEffect(() => {
		socket.emit("initial_data");
		socket.on("get_data", data => {
			setTaskList(data)
		});
		socket.on("change_data", changeData);
	}, []);

	return (
		<>
			<ul>
				{taskList.length !== 0
					? taskList.map(task => <li key={task.id}>{task.description}</li>)
					: ''
				}
			</ul>
			<form action="" onSubmit={saveTask}>
				<input
					type="text"
					placeholder="task"
					value={task}
					onChange={e => setTask(e.target.value)}
				/>
				<button type="submit">Save</button>
			</form>
		</>
	);
}

export default App;