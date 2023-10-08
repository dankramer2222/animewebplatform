import { BrowserRouter, Routes,Route } from "react-router-dom";
import Popular from "./Components/Popular";
import AnimeItem from "./Components/AnimeItem";
import Homepage from "./Components/Homepage";
import Gallery from "./Components/Gallery";


function App() {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/anime/:id" element={<AnimeItem />}/>
      <Route path="/character/:id" element={<Gallery />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
