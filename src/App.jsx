import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AccountPage, BookListPage, BookPage, HomePage, Login, MyBooksPage, Registration } from './pages/allPages'
import NavBar from './components/NavBar'
import './style.css'

function App() {

  return (
    <div className="flex">
      <Router>
        <NavBar  />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/bookList" element={<BookListPage />}></Route>
          <Route path="/book/:bookid" element={<BookPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration  />}></Route>
          <Route path="/myList" element={<MyBooksPage />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App
