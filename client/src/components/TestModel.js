import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export const TestModel = () => {
    const [chatlog, setChatlog] = useState([
        { user: 'GPT', message: 'how can i help' }
    ]);
    let { contactId } = useParams();
    console.log(contactId);

    const [textinput, setTextinput] = useState('');
    console.log('chatlog,', chatlog);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const chatLogNew = [...chatlog, { user: 'Sohail', message: `${textinput}` }];
        console.log('chatLogNew: ', chatLogNew);
        setTextinput("");
        setChatlog(chatLogNew);
        fetch('http://localhost:8000/chatlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model:contactId,
                message: textinput
            })
        })
            .then(response => response.json())
            .then(async (data) => {
                chatlog.map(message => message.message).join("\n");
                console.log(data);
                setChatlog([...chatLogNew, { user: 'GPT', message: data.message }]);
            })
            .catch(err => { console.log(err); });
    }
    return (
        <div>  <aside className='side-menu'>
            <div className='side-menu-button'>
                <span>+</span> New chat
            </div>
        </aside>
            <section className='chatbox'>
                <div className='chatbox-wrapper'>
                    <div className='chat-logs'>
                        {chatlog.map((chat, i) => (
                            <div key={i} className={chat.user == "GPT" ? 'chat-message' : 'chat-message-user'}>
                                <div className='avatar-chatgpt'>{chat.user}</div>
                                <div className='message'>{chat.message}</div>
                            </div>
                        ))}
                    </div>
                    <div className='chatbox-input-holder'>
                        <form onSubmit={async (e) => handleSubmit(e)}>
                            <input value={textinput} onChange={(e) => setTextinput(e.target.value)} className='chatbox-input-text-area' placeholder='Type...' />
                        </form>
                    </div>
                </div>
            </section></div>
    )
}
