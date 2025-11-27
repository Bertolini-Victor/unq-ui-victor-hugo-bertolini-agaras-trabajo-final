import './navbar.css'
import Storage from '../services/storage.js'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();

    const [easyScore, setEasyScore] = useState(() => {try { return Storage.getHighestScore('easy') || 0;} catch {return 0;}});
    const [mediumScore, setMediumScore] = useState(() => {try {return Storage.getHighestScore('medium') || 0;} catch {return 0;}});
    const [hardScore, setHardScore] = useState(() => {try {return Storage.getHighestScore('hard') || 0;} catch {return 0;}});
    const [extremeScore, setExtremeScore] = useState(() => {try {return Storage.getHighestScore('extreme') || 0;} catch {return 0;}});

    const handlerHome = () => {
        navigate('/');
    }

    const handlerAbout = () => {
        navigate('/about');
    }

    return (
        <nav className='navBar'>
            <div className='logos'>
                <img className= 'logoWilly' src="./web_menu_willy.png" alt="El logo de Willy" />
                <img className= 'logoName' src="./web_menu_logo_en_dark.png" alt="El nombre de la pagina" />
            </div>
            <ul className='ulNav'>
                <button onClick={handlerHome}>Home</button>
                <button onClick={handlerAbout}>About</button>
            </ul>
            <div className='scoreBoard'>
                <h3>Best Scores</h3>
                <ul className='scoreList'>
                    <li>Easy difficulty: {easyScore}</li>
                    <li>Normal difficulty: {mediumScore}</li>
                    <li>Hard difficulty: {hardScore}</li>
                    <li>Expert difficulty: {extremeScore}</li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;