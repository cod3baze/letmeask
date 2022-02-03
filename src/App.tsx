import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
