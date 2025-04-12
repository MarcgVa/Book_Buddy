import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { AccountPage, BookListPage, BookPage, HomePage, Login, Registration } from './pages/allPages'
import NavBar from './components/NavBar'
import { useState } from 'react'
import './style.css'

function App() {
  const [token, setToken] = useState(null);
 //const navigate = useNavigate();

  return (
    <div className="flex">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/bookList" element={<BookListPage token={token} />}></Route>
          <Route path="/book/:bookId" element={<BookPage token={token } />}></Route>
          <Route path="/account" element={<AccountPage token={token } />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route path="/register" element={<Registration setToken={setToken} />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App
