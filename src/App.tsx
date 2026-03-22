import { BrowserRouter, Routes, Route } from 'react-router-dom';

function HomePage() {
  return <h1>HOME OK</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}