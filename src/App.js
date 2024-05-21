import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './layout/navbar/Navbar';
import Home from './pages/home/Home';
import Info from './pages/info/Info';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<Info />} />
      </Routes>
    </div>
  );
}

export default App;
