import './navbar.css'
import Storage from '../services/storage.js'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [easyScore, setEasyScore] = useState(() => {try { return Storage.getHighestScore('easy') || 0;} catch {return 0;}});
    const [normalScore, setNormalScore] = useState(() => {try {return Storage.getHighestScore('normal') || 0;} catch {return 0;}});
    const [hardScore, setHardScore] = useState(() => {try {return Storage.getHighestScore('hard') || 0;} catch {return 0;}});
    const [extremeScore, setExtremeScore] = useState(() => {try {return Storage.getHighestScore('extreme') || 0;} catch {return 0;}});

    useEffect(() => {
        const updateScores = () => {
            setEasyScore(Storage.getHighestScore('easy') || 0);
            setNormalScore(Storage.getHighestScore('normal') || 0);
            setHardScore(Storage.getHighestScore('hard') || 0);
            setExtremeScore(Storage.getHighestScore('extreme') || 0);
        };
        window.addEventListener('scoreUpdated', updateScores);
        return () => {
            window.removeEventListener('scoreUpdated', updateScores);
        };
    }, []); 

    const handlerHome = () => {
        navigate('/');
    }

    const handlerAbout = () => {
        navigate('/about');
    }
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <nav className={`navBar ${isOpen ? 'open' : ''}`}>
            <div className='top-bar-mobile'>
                <div className='logos' onClick={handlerHome}>
                    <img className='logoWilly' src="/web_menu_willy.png" alt="Logo Willy" />
                    <img className='logoName' src="/web_menu_logo_en_dark.png" alt="Logo Texto" />
                </div>
                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
            <div className='nav-links-container'>
                <ul className='ulNav'>
                    <button onClick={handlerHome}>Home</button>
                    <button onClick={handlerAbout}>About</button>
                </ul>
                <div className='scoreBoard'>
                    <h3>Best Scores</h3>
                    <div className='scoreList'>
                        <div className='score-card'><span className='score-label'>Easy</span><span className='score-value easy'>{easyScore}</span></div>
                        <div className='score-card'><span className='score-label'>Normal</span><span className='score-value normal'>{normalScore}</span></div>
                        <div className='score-card'><span className='score-label'>Hard</span><span className='score-value hard'>{hardScore}</span></div>
                        <div className='score-card'><span className='score-label'>Extreme</span><span className='score-value extreme'>{extremeScore}</span></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;