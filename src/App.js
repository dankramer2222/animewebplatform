import Popular from "./Components/Popular";
import { useGlobalContext } from "./context/global";

function App() {
  const global = useGlobalContext();
  console.log(global);
  return(
    <div className="App">
      <Popular />
    </div>
  )
}

export default App;
