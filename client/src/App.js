import { Route, Routes } from "react-router-dom";
import Diaries from "./components/Diaries";
import SearchResult from "./components/SearchResult";
import SingleDiary from "./components/SingleDiary";
import WriteDiary from "./components/WriteDiary";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Diaries /> } />
        <Route path="/writediary" element={ <WriteDiary /> } />
        <Route path="/diary/:id" element={ <SingleDiary /> } />
        <Route path="/search" element={ <SearchResult /> } />
      </Routes>
    </div>
  );
}

export default App;
