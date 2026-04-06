import React from 'react';
import './App.css';
import AddStudent from './components/AddStudent';
import ViewStudents from './components/ViewStudents';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Student Portfolio Application</h1>
        <p>MERN Stack CRUD Operations</p>
      </header>
      <div className="container">
        <AddStudent />
        <ViewStudents />
      </div>
    </div>
  );
}

export default App;
