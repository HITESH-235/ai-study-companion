import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Subjects from "./pages/Subjects";
import Revision from "./pages/Revision";
import AITools from "./pages/AITools";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/subjects" element={<Subjects/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/revision" element={<Revision/>}/>
          <Route path="/ai-tools" element={<AITools/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;