import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UpdateTaskForm from './components/UpdateTaskForm';
import AddTaskForm from './components/AddTaskForm';
import ToDo from './components/ToDo';

function App() {
  const [toDo, setToDo] = useState([]);
  const [newData, setNewData] = useState('');
  const [updateData, setUpdateData] = useState('');

  const addTask = () => {
    if (newData) {
      let id = toDo.length + 1;
      let newEntry = { id: id, title: newData, status: false };
      setToDo([...toDo, newEntry]);
      setNewData('');
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  const cancelUpdate = () => {
    setUpdateData('');
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTask = () => {
    let filteredRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filteredRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  };

  return (
    <div className="container App">
      <br></br>
      <h2>To-Do</h2>
      <h3>Usenov Nauryzbek</h3>
      <h4>IT2-2009</h4>
      <br></br>

      {updateData && updateData ? (
        <UpdateTaskForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newData={newData}
          setNewData={setNewData}
          addTask={addTask}
        />
      )}

      {toDo && toDo.length ? '' : 'No tasks for now..'}
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
