import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Gallery from './pages/gallery';
import Create from './pages/create';
import Info from './pages/info';
import Edit from './pages/edit';
import Navigation from './componets/navBar';


function App() {

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/info/:id" element={<Info />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  )
}

export default App

