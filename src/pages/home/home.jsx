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
                <div className='hero-section'>
                    <h1 className='main-title'>Trivia <span className='highlight'>Crack</span></h1>
                    <p className='subtitle'>Select your challenge level and prove your knowledge.</p>
                </div>
                <div className='difficulty-grid'>
                    <button className='difficulty-card easy' onClick={() => handlerGame('easy')}>
                        <div className='card-content'>
                            <h3>Easy</h3>
                            <span>For beginners</span>
                        </div>
                    </button>
                    <button className='difficulty-card normal' onClick={() => handlerGame('normal')}>
                        <div className='card-content'>
                            <h3>Normal</h3>
                            <span>Standard challenge</span>
                        </div>
                    </button>
                    <button className='difficulty-card hard' onClick={() => handlerGame('hard')}>
                        <div className='card-content'>
                            <h3>Hard</h3>
                            <span>For veterans</span>
                        </div>
                    </button>
                    <button className='difficulty-card extreme' onClick={() => handlerGame('extreme')}>
                        <div className='card-content'>
                            <h3>Extreme</h3>
                            <span>Only for legends</span>
                        </div>
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Home;