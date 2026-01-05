import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Configure from "./screen/Configure";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Configure />
    </>
  );
}

export default App;
