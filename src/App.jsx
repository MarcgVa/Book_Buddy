import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AccountPage, BookListPage, BookPage, HomePage, Login, MyBooksPage, Registration } from './pages/allPages'
import NavBar from './components/NavBar'
import { useEffect, useState } from 'react'
import './style.css'

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  },[]);

  return (
    <div className="flex">
      <Router>
        <NavBar token={token} setToken={ setToken } />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/bookList" element={<BookListPage token={token} />}></Route>
          <Route path="/book/:bookid" element={<BookPage token={token }/>}></Route>
          <Route path="/account" element={<AccountPage token={token } />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route path="/register" element={<Registration setToken={setToken} />}></Route>
          <Route path="/myList" element={<MyBooksPage token={token} />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App
