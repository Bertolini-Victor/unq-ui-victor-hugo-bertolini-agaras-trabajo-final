import './home.css'
import Navbar from '../../components/navbar.jsx'
import { useState, useEffect } from 'react';
import { getDifficulties } from '../../services/api.js';
import { useNavigate } from 'react-router-dom';
import Storage from '../../services/storage.js';

const Home = () => {
    const navigate = useNavigate();
    const [difficulties, setDifficulties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const difficultyConfig = {
        easy: {
            title: 'Easy',
            subtitle: 'For beginners',
            cssClass: 'easy'
        },
        normal: {
            title: 'Normal',
            subtitle: 'Standard challenge',
            cssClass: 'normal'
        },
        hard: {
            title: 'Hard',
            subtitle: 'For veterans',
            cssClass: 'hard'
        },
        extreme: { 
            title: 'Extreme',
            subtitle: 'Only for legends',
            cssClass: 'extreme'
        }
    };

    const defaultStyle = {
        title: 'Unknown',
        subtitle: 'New challenger',
        cssClass: '' 
    };

    useEffect(() => {
        const fetchDifficulties = async () => {
            try {
                const response = await getDifficulties();
                setDifficulties(response.data);
            } catch (error) {
                console.error("Error fetching difficulties:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDifficulties();
    }, []);

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
                    {loading ? (<p style={{color: '#888'}}>Loading difficulties...</p>) : (
                        difficulties.map((diffKey) => {
                            const config = difficultyConfig[diffKey] || { 
                                ...defaultStyle, 
                                title: diffKey.charAt(0).toUpperCase() + diffKey.slice(1) 
                            };
                            return (
                                <button 
                                    key={diffKey}
                                    className={`difficulty-card ${config.cssClass}`} 
                                    onClick={() => handlerGame(diffKey)}>
                                    <div className='card-content'>
                                        <h3>{config.title}</h3>
                                        <span>{config.subtitle}</span>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </main>
        </div>
    );
}

export default Home;