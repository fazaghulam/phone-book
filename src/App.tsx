import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Contact />} />
      <Route path="/create" element={<Create />} />
      <Route path="contact/:id" element={<Detail />} />
      <Route path="edit/:id" element={<Edit />} />
    </Routes>
  </BrowserRouter>
);

export default App;
