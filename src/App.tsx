import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LibraryPage } from '@/pages/LibraryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME OK</h1>} />
        <Route path="/library" element={<LibraryPage language="es" />} />
      </Routes>
    </BrowserRouter>
  );
}