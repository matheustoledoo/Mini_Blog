

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"; // importa a autentificação de usuario do firebase


// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//css
import './App.css'

//context
import { AuthProvider } from "./context/AuthContext.jsx";


// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from "./pages/CeatePost/CreatePost.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Search from "./pages/Search/Search.jsx";
import Post from "./pages/Post/Post.jsx";
import EditPost from "./pages/EditPost/EditPost.jsx";



//Componentes
import Navbar from './components/Navbar'
import Footer from './components/Footer'



function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined //aqui identifica se o user esta carregando de alguma maneira

  useEffect(() => { // aqio carrega p usuario para nao ficar o texto do loadingUser
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path='/posts' element={<Post />} />
              <Route path='/login' element={!user ? <Login/> : <Navigate to="/" />} /> {/*esse if ternario nao deixa com o que o usuario logado ao digitar na navegação do google /login entre no login*/}
              <Route path='/register' element={!user ? <Register/> : <Navigate to="/" />} />
              <Route path='/posts/edit/:id' element={!user ? <EditPost/> : <Navigate to="/login" />} />
              <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to="/" />} />
              <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
