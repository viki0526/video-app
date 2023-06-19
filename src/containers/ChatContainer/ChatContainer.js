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
    setStatus('read')    
    setMessageListArray([...messageListArray, generateMessage(message, isUser)])
    clearRef()
    forceUpdate()
  }

  const generateMessage = (message, isUser) => {
      return {
        type: 'text',
        id: String(Math.random()),
        position: isUser ? 'right' : 'left', 
        text: message,
        title: isUser ? 'You' : 'Bot',
        focus: true,
        date: +new Date(),
        dateString: 'now',
      //   avatar: `data:image/png;base64,${photo(20)}`,
        titleColor: 'grey',
        forwarded: true,
        replyButton: true,
        removeButton: true,
        status: 'received',
        notch: true,
        copiableDate: true,
        retracted: false,
        className: '',
      }
    }

    console.log(inputReferance.current)

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
        messageBoxStyles={{ backgroundColor: 'lightgreen' }}
        notchStyle={{ fill: 'lightgreen' }}
      />

      <div
        // style={{
        //   position: 'fixed',
        //   bottom: 0,
        //   right: 0,
        //   left: 0,
        //   margin: '0 auto 1rem auto',
        //   width: '60%',
        // }}
      >
        <Input
          className='rce-example-input'
          placeholder='Write your message here.'
          defaultValue=''
          referance={inputReferance}
          clear={(clear) => (clearRef = clear)}
          maxHeight={50}
          onKeyPress={(e) => {
            if (e.shiftKey && e.charCode === 13) {
              return true
            }
            if (e.charCode === 13) {
              clearRef()
              addMessage()
            }
          }}
          rightButtons={<Button text='Submit' onClick={() => addMessage(inputReferance.current?.value, true)} />}
        />
      </div>
    </div>
  )
}