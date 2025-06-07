import { Routes, Route } from "react-router-dom"
import Login from "./routes/Login"
import Home from "./routes/Home"
import Navbar from "./componets/NavBar"
import RequireAuth from "./componets/RequireAuth"

function App() {

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
      </Routes>
    </>
  )
}

export default App
