import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import About from './pages/about/about.jsx'
import Game from './pages/game/game.jsx'

const RoutesConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/game/:difficulty" element={<Game />} />
        </Routes>
    );
}

export default RoutesConfig;