import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Canvas from "./pages/canvas";


function App() {
  

  return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/canvas/:id" element={<Canvas/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
