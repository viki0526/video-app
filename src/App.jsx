import './App.css';
import Youtube from 'react-youtube';
import {useState, useEffect} from 'react';
import ChatContainer from './containers/ChatContainer/ChatContainer';


export default function App() {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [videoId, setVideoId] = useState('5-O8Da5oowo');



    const handleViewButton = () => {
        const id = extractID(textFieldValue);
        const url_ws = new WebSocket("ws://127.0.0.1:5000/set_url");
        url_ws.onopen = (event) => {
            url_ws.send(textFieldValue);
        }
        url_ws.onmessage = (event) => {
            const sum_ws = new WebSocket("ws://127.0.0.1:5000/summarize");
            sum_ws.onmessage = (event) => {
                document.getElementById("summary").innerText = event.data;
            }
        }
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
                    <div className='summary-body' id="summary">

                    </div>
                </div>
            </div>
            <div className='chat-container'>
                <ChatContainer/>
            </div>
        </div>
    );
    
}
