import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;