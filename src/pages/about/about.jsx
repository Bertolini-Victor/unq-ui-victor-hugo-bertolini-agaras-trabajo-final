import './about.css'
import Navbar from '../../components/navbar.jsx'

const About = () => {
    return(
        <div className='aboutPage'>
            <Navbar />
            <main className='aboutBody'>
                <div className='about-hero'>
                    <h1 className='about-title'>About <span className='highlight'>Trivia Crack</span></h1>
                    <p className='about-subtitle'>Behind the pixels of this challenge.</p>
                </div>
                <div className='about-grid'>
                    <div className='about-card academic'>
                        <h2>The Project</h2>
                        <p>
                            This game was developed as the <strong>Final Integrated Project (TFI)</strong> for the 
                            <em> "User Interface Construction"</em> subject at the National University of Quilmes.
                        </p>
                        <p className='faded-text'>
                            The goal was to build a responsive, interactive SPA (Single Page Application) consuming external APIs.
                        </p>
                    </div>
                    <div className='about-card gameplay'>
                        <h2>How to Play</h2>
                        <p>
                            Select your difficulty and answer 10 questions. 
                            But be careful! You only have <strong>10 seconds</strong> per round.
                        </p>
                        <ul className='features-list'>
                            <li>Real-time API Fetching</li>
                            <li>Time Challenge System</li>
                            <li>Local Score Persistence</li>
                        </ul>
                    </div>
                    <div className='about-card tech'>
                        <h2>Tech Stack</h2>
                        <p>Built with modern web standards for max performance.</p>
                        <div className='tech-badges'>
                            <span className='badge react'>React</span>
                            <span className='badge vite'>Vite</span>
                            <span className='badge css'>CSS3</span>
                            <span className='badge router'>React Router</span>
                        </div>
                    </div>
                    <div className='about-card author'>
                        <h2>The Developer</h2>
                        <p>
                            Designed and coded with passion for UI/UX. 
                            Focused on clean code, component reusability, and modern layouts.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default About;