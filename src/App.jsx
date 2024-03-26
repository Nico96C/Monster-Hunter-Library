import { Link, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./API/Home.jsx"
import ArmorData from "./API/ArmorData.jsx";
import WeaponData from "./API/WeaponData.jsx"

function App() {
  return (
    <BrowserRouter>
      <header className="encabezado">
        <h1> MONSTER HUNTER: WORLD - WIKI </h1>
        <li className="listado">
          <ul className="items">
            <Link to="/home">Home</Link>
          </ul>
          <ul className="items">
            <Link to="/armordata">Armors</Link>
          </ul>
          <ul className="items">
            <Link to="/weaponsdata">Weapons</Link>
          </ul>
        </li>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/armordata" element={<ArmorData />} />
        <Route path="/weaponsdata" element={<WeaponData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
