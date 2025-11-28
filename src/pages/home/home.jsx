import './home.css'
import Navbar from '../../components/navbar.jsx'
import { useNavigate } from 'react-router-dom';
import Storage from '../../services/storage.js';

const Home = () => {
    const navigate = useNavigate();

    const handlerGame = (difficulty) => {
        navigate(`/game/${difficulty}`);
    }
    
    return(
        <div className='homePage'>
            <Navbar />
            <main className='mainBody'>
                <div className='titles'>
                    <h1>Welcome to Trivia Crack</h1>
                    <h2>Try your knowledge with our different difficulty levels</h2>
                </div>
                <div className='buttonsGame'>
                    <button className='buttonEasy' onClick={() => handlerGame('easy')}>Easy</button>
                    <button className='buttonNormal' onClick={() => handlerGame('normal')}>Normal</button>
                    <button className='buttonHard' onClick={() => handlerGame('hard')}>Hard</button>
                    <button className='buttonExpert' onClick={() => handlerGame('expert')}>Expert</button>
                </div>
            </main>
        </div>
    );
}

export default Home;