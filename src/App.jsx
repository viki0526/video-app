import './App.css';
import Youtube from 'react-youtube';
import {useState} from 'react';
import ChatContainer from './containers/ChatContainer/ChatContainer';

export default function App() {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [videoId, setVideoId] = useState('5-O8Da5oowo');

    const handleViewButton = () => {
        const id = extractID(textFieldValue);
        setVideoId(id);
    }

    const extractID = (url) => {
        const match = url.match(/[?&]v=([^?&]+)/);
        return match && match[1];
    }

    const handleChange = (event) => {
        setTextFieldValue(event.target.value);
    };

    return (
        <div className="app-container">
            <div className="video-container">
                <div className="video-player">
                    <Youtube 
                    videoId={videoId}
                    />
                </div>
                <div className='video-options'>
                    <div className="link-container">
                        <input className="link-input" type="text" placeholder='enter youtube link' value={textFieldValue} onChange={handleChange}>
                        </input>
                    </div>
                    <div className='button-container'>
                        <button className="view-button" onClick={handleViewButton}>VIEW VIDEO</button>
                    </div>
                </div>
                <div className='video-summary'>
                    <div className='summary-title'>
                        VIDEO SUMMARY
                    </div>
                    <div className='summary-body'>

                    </div>
                </div>
            </div>
            <div className='chat-container'>
                <ChatContainer/>
            </div>
        </div>
    );
    
}
