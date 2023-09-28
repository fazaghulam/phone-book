import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Contact />} />
      <Route path="contact/:id" element={<Detail />} />
    </Routes>
  </BrowserRouter>
);

export default App;
