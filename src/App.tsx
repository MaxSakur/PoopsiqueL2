import Header from "./components/header";
import RaidList from "./screens/raid_list";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Craft from "./screens/craft";
import DinoTracker from "./screens/dinoTracker";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="rb" element={<RaidList />} />
        <Route path="dino" element={<DinoTracker />} />
        <Route path="craft" element={<Craft />} />
        <Route path="*" element={<></>} />
      </Route>
    </Routes>
  );
}
function Layout() {
  return (
    <div className="App">
      <Header />

      <Outlet />
    </div>
  );
}

export default App;
