import React from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import ExpenseForm from './components/ExpenseForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExpenseList from './components/ExpenseList';

function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <ExpenseTracker/>}/>
          <Route path='/form' element={ <ExpenseForm/>}/>
          <Route path='/expense-list' element={ <ExpenseList/>}/>
     </Routes>
     </Router>
    </div>
    </>
  );
}

export default App;
