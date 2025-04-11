import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AccountPage, BookListPage, BookPage, HomePage } from './pages/allPages'
import NavBar from './components/NavBar'
import { useState } from 'react'
import './style.css'

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className='flex'>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/'element={<HomePage />}></Route>
          <Route path="/bookList" element={<BookListPage />}></Route>
          <Route path="/book/:bookId" element={<BookPage />}></Route>
          <Route path="/account" element={<AccountPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App
