import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
// import { toast } from "react-hot-toast";


function App() {
  
  return (
    <div className="relative h-full w-full" data-theme="forest" >
      <div className="absolute inset-0 -z-10 h-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"></div>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/notes/:id" element={<NoteDetailPage/>} />
      </Routes>

    </div>
  )
}

export default App