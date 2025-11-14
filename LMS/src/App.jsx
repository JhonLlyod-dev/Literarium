import { useEffect, useState } from 'react'
import { ArchiveX } from 'lucide-react'
import './App.css'
import { Routes,BrowserRouter as Router , Route } from 'react-router-dom';

// import Components
import Home from './Pages/Home';
import SearchBook from './Pages/SearchBook'; 
import View from './Pages/View';

function App() {

  const CheckDue = () => {
    fetch("/borrow/checkDue", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  useEffect(() => {
    CheckDue();
  }, []);

  return (
    <Router>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search/:query?' element={<SearchBook/>}/>
        <Route path='/view/:isbn?' element={<View/>}/>
      </Routes>

    </Router>
  )
}

export default App
