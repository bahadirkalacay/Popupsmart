import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import EditPage from './components/EditPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
       
        <Route path="/edit/:id" element={<EditPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
