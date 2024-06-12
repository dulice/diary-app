import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Diaries from "./pages/Diaries";
import SingleDiary from "./pages/SingleDiary";
import SearchResult from "./pages/SearchResult";
import WriteDiary from "./pages/WriteDiary";

function App() {
  const [mode, setMode] = useState(false);
  const handleSetMode = () => {
    setMode(!mode);
  }
  return (
    <div className={`${mode ? "dark" : ""} duration-1000` }>
      <Routes>
        <Route path="/" element={ <Diaries handleSetMode={handleSetMode} /> } />
        <Route path="/writediary" element={ <WriteDiary /> } />
        <Route path="/diary/:id" element={ <SingleDiary /> } />
        <Route path="/search" element={ <SearchResult handleSetMode={handleSetMode} /> } />
      </Routes>
    </div>
  );
}

export default App;
