import { Route, Routes } from "react-router-dom";
import AppProvider from "./provider/AppProvider";
import NAV_ITEMS from "./routes/routex";

function App() {
  return (
    <Routes>
      <Route path="*" element={<AppProvider routes={NAV_ITEMS} />} />
    </Routes>
  );
}

export default App;
