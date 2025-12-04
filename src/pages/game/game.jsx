    import './game.css';
    import Navbar from '../../components/navbar.jsx';
    import { useParams, useNavigate } from 'react-router-dom';
    import { useState, useEffect } from 'react';
    import {getQuestions, postAnswer} from '../../services/api.js';
    import Storage from '../../services/storage.js';

    const Game = () => {
        const { difficulty } = useParams();
        const navigate = useNavigate();

        const [questions, setQuestions] = useState([]);
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const [score, setScore] = useState(0);
        const [selectedOption, setSelectedOption] = useState(null);
        const [answerResult, setAnswerResult] = useState(null);
        const [isAnswered, setIsAnswered] = useState(false);
        const [isGameOver, setIsGameOver] = useState(false);
        const [timeLeft, setTimeLeft] = useState(10);

        useEffect(() => {
            const fetchQuestions = async () => {
                try {
                    const response = await getQuestions(difficulty);
                    const allQuestionsFormatted = response.data.map(q => ({
                        ...q,
                        options: [
                            { key: 'option1', text: q.option1 },
                            { key: 'option2', text: q.option2 },
                            { key: 'option3', text: q.option3 },
                            { key: 'option4', text: q.option4 }
                        ]
                    }));
                    setQuestions(allQuestionsFormatted);
                } catch (error) {
                    console.error("Error fetching questions:", error);
                }
            };
            fetchQuestions();
        }, [difficulty]);

        useEffect(() => {
            if (isGameOver) {
                const currentRecord = parseInt(Storage.getHighestScore(difficulty) || '0');
                if (score > currentRecord) {
                    Storage.setHighestScore(difficulty, score);
                    console.log("¡Nuevo récord guardado!", score);
                }
            }
        }, [isGameOver, score, difficulty]);

        useEffect(() => {
            if (isAnswered || isGameOver || !questions.length) return;
            if (timeLeft === 0) {
                handleTimeout();
                return;
            }
            const timerId = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }, [timeLeft, isAnswered, isGameOver, questions]);

        const handleNextQuestion = () => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setAnswerResult(null);
                setIsAnswered(false);
                setTimeLeft(10);
            } else {
                setIsGameOver(true);
            }
        };

        const handleTimeout = () => {
            setIsAnswered(true);
            setAnswerResult(false);
            setSelectedOption(null);
            setTimeout(() => {
                handleNextQuestion();
            }, 2000);
        };

        const finishGame = () => {
            Storage.setHighestScore(difficulty, score);
        };

        const handleAnswer = async (optionKey) => {
            if (isAnswered) return;
            setIsAnswered(true);
            setSelectedOption(optionKey);
            const currentQuestion = questions[currentQuestionIndex];
            try {
                const response = await postAnswer(currentQuestion.id, optionKey);
                const isCorrect = response.data.answer;
                setAnswerResult(isCorrect);
                if(isCorrect) setScore(prev => prev + 1);
                setTimeout(() => {
                    handleNextQuestion();
                }, 2000); 

            } catch (error) {
                console.error("Error validando respuesta", error);
                setTimeout(() => {
                    handleNextQuestion();
                }, 2000);
            }
        }

        const getButtonClass = (optionKey) => {
            let baseClass = 'answerButton';
            if (!isAnswered) return baseClass;

            if (optionKey === selectedOption) {
                if (answerResult === true) return `${baseClass} correct`;
                if (answerResult === false) return `${baseClass} incorrect`;
            }
            return `${baseClass} disabled`;
        };

        const handleRestart = () => {
            setScore(0);
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setAnswerResult(null);
            setIsAnswered(false);
            setIsGameOver(false);
        };

        const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

        const getFeedback = () => {
            const percentage = (score / questions.length) * 100;
            return [
                () => percentage === 100 && 'Perfect Score',
                () => percentage >= 80 && 'Excellent Performance',
                () => percentage >= 50 && 'Good Job',
                () => true && 'Practice makes perfect'
            ].reduceRight((acc, fn) => fn() || acc, '')
        }

        if (isGameOver) {
            const feedback = getFeedback();
            return (
                <div className='gamePage'>
                    <Navbar />
                    <div className='gameContainer'>
                        <div className='resultCard'>
                            <h1 className='resultTitle'>Game Over</h1>
                            <p className='resultMessage'>{feedback}</p>
                            <div className='scoreCircle'>
                                <span className='scoreBig'>{score}</span>
                                <span className='scoreTotal'>/ {questions.length}</span>
                            </div>
                            <div className='resultButtons'>
                                <button className='restartButton' onClick={handleRestart}>
                                    Play Again
                                </button>
                                <button className='homeButton' onClick={() => navigate('/')}>
                                    Change Difficulty
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='gamePage'>
                <Navbar />
                <div className='gameContainer'>
                    <header className='gameHeader'>
                        <h1>Difficulty: {difficulty}</h1>   
                        <div className='gameStats'>
                            <p className='questionCounter'>Question {currentQuestionIndex + 1} / {questions.length}</p>
                            <div className='timer-container'>
                                <div className='timer-text'>
                                    <span>Time Left</span>
                                    <span style={{ color: timeLeft <= 3 ? '#ff4d4d' : 'inherit' }}>{timeLeft}s</span>
                                </div>
                                <div className='progress-bar-track'>
                                    <div 
                                        className={`progress-bar-fill ${timeLeft <= 3 ? 'danger' : ''}`}
                                        style={{ width: `${(timeLeft / 10) * 100}%` }} 
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <h2 id='question'>{currentQuestion ? currentQuestion.question : 'Loading...'}</h2>
                    </header>
                    <main className='answers'>
                        {currentQuestion && currentQuestion.options.map((optionObj) => (
                            <button 
                                key={optionObj.key}
                                className={getButtonClass(optionObj.key)}
                                onClick={() => handleAnswer(optionObj.key)}
                                disabled={isAnswered}
                            >
                                {optionObj.text}
                            </button>
                        ))}
                    </main>
                </div>
            </div>
        );
    }

    export default Game;