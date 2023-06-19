import { useRef, useState } from 'react'
import { MessageList, Input, Button } from 'react-chat-elements'
import './ChatContainer.css'
import "react-chat-elements/dist/main.css"

// import Identicon from 'react-identicons';

// export const photo = (size) => {
//     <Identicon
//       value={address}
//       size={size}
//       theme={theme}
//     />
//   }
  
const sleep = ms => new Promise(r => setTimeout(r, ms));

  export function useForceUpdate() {
    const [value, setValue] = useState(0)
    return () => setValue(() => value + 1)
  }

let clearRef = () => {}

export default function ChatContainer() { 
  const [messageListArray, setMessageListArray] = useState([])
  const [status, setStatus] = useState('')
  const messageListReferance = useRef()
  const inputReferance = useRef()

  const forceUpdate = useForceUpdate()

  const addMessage = (message, isUser) => {
    if (!message) {
        return
    }   
    setStatus('read')
    setMessageListArray(curr => [...curr, {
        type: 'text',
        id: String(Math.random()),
        position: isUser ? 'right' : 'left', 
        text: message,
        title: isUser ? 'You' : 'Bot',
        focus: true,
        date: +new Date(),
        dateString: 'now',
      //   avatar: `data:image/png;base64,${photo(20)}`,
        titleColor: 'darkblue',
        status: 'received',
        notch: true,
        copiableDate: true,
        retracted: false,
        className: '',
      }])
    clearRef()
    forceUpdate()
  }

  const onSend = () => {
    let message = inputReferance.current?.value
    addMessage(message, true)
    getBotResponse(message)
  }

  //echo for now
  const getBotResponse = async (message) => {
    await sleep(1000)
    addMessage(message, false)
  }

  return (
    <div className='right-panel 
    rce-example-messageList'
    >
        <MessageList
        className='message-list'
        referance={messageListReferance}
        dataSource={messageListArray}
        lockable={true}
        downButton={true}
        downButtonBadge={10}
        sendMessagePreview={true}
        messageBoxStyles={{ backgroundColor: 'white' }}
        notchStyle={{ fill: 'white' }}
        />
        <Input
            className='rce-example-input'
            placeholder='Ask a question...'
            defaultValue=''
            referance={inputReferance}
            clear={(clear) => (clearRef = clear)}
            maxHeight={50}
            onKeyPress={(e) => {
            if (e.shiftKey && e.charCode === 13) {
                return true
            }
            if (e.charCode === 13) {
                onSend()
                clearRef()
            }
            }}
            rightButtons={<Button text='&nbsp; &#8680;&nbsp;' onClick={onSend} />}
        />
    </div>
  )
}