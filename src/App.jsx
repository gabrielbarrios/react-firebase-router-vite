import { Routes, Route } from "react-router-dom"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Home from "./routes/Home"
import Navbar from "./componets/NavBar"
import RequireAuth from "./componets/RequireAuth"
import { useContext } from "react"
import { UserContext } from "./context/UserProvider"

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
      <h1>hello world</h1>
      <Routes>

        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>

        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
