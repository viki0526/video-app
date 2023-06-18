import './App.css';

export default function App() {
    return (
        <div className="app-container">
            <div className="video-container">
                <div class="video-player">
                    <video id="video"></video>
                </div>
                <div className='video-options'>
                    <div className="link-container">
                        <input className="link-input" type="text"></input>
                    </div>
                    <div className='button-container'>
                        <button className="view-button">VIEW VIDEO</button>
                    </div>
                </div>
            </div>
            <div className='chat-container'>
                
            </div>
        </div>
    );
    
}
