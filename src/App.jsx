import { useContext } from "react"
import { Routes, Route, Router } from "react-router-dom"
import 'flowbite';

import Login from "./routes/Login"
import Register from "./routes/Register"
import Home from "./routes/Home"
import Perfil from "./routes/Perfil"

import Navbar from "./componets/NavBar"
import LayoutRequireAuth from "./componets/layouts/LayoutRequireAuth"
import { UserContext } from "./context/UserProvider"
import LayoutContainerForm from "./componets/layouts/LayoutContainerForm"
import NotFound from "./routes/NotFound";
import LayoutRedirect from "./componets/layouts/LayoutRedirect";


function App() {

  const { user } = useContext(UserContext);

  if (user === false) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>


        <Route path='/' element={<LayoutContainerForm />} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path='/:nanoid' element={<LayoutRedirect />} >
          <Route index element={<NotFound />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
