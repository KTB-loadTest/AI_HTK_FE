import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoCreationPage from "./pages/VideoCreationPage/VideoCreationPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video-creation" element={<VideoCreationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
