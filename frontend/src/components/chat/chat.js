import React from 'react';
import {
    Container,
    Button,
    Form,
} from 'react-bootstrap';


function MessageBox(props) {
    const handleSave = (e) => {
        e.preventDefault();

        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const jsonData = JSON.stringify(data);

        fetch('https://192.168.1.3:8000/api/chats/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
            },
            body: jsonData,
        })
            .then((response) => response.json())
            .then(() => {
                const messageBox = document.getElementById('message-box');
                messageBox.value = '';
            })
            .catch((error) => console.error(error));
    }

    return (
        <Form onSubmit={handleSave}>
            <Container fluid='true' className='d-flex'>
                <Form.Group className='me-3' style={{ maxWidth: '200px' }}>
                    <Form.Control
                        type='text'
                        name='user'
                        maxLength='15'
                        required
                        placeholder='Choose a username'
                    />
                </Form.Group>
                <Form.Group className='flex-fill'>
                    <Form.Control
                        id='message-box'
                        type='text'
                        name='message'
                        maxLength='200'
                        required
                        placeholder='Type your message here'
                    />
                </Form.Group>
            </Container>
            <Container fluid='true' className='d-flex justify-content-end'>
                <Button variant='success' type='submit' className='mt-3'>
                    Send
                </Button>
            </Container>
        </Form>
    );
}

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            info: [],
        }
    }

    runAPI() {
        fetch('https://192.168.1.3:8000/api/chats/')
            .then(res => res.json())
            .then(
                (result) => {
                    if (!this.state.info[0] || result[result.length - 1].message !== this.state.info[this.state.info.length - 1].message) {
                        this.setState({
                            isLoaded: true,
                            info: result,
                        }, () => {
                            const messages = document.getElementById('messages');
                            messages.scrollTop = messages.scrollHeight;
                        });
                    } else {
                        this.setState({
                            isLoaded: true,
                            info: result,
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error.toString()
                    });
                },
            )
    }

    componentDidMount() {
        this.runAPI();

        this.timerID = setInterval(
            () => this.updateInfo(),
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateInfo() {
        this.runAPI();
    }


    render() {
        const { error, isLoaded, info } = this.state;

        if (error) {
            return (
                <Container fluid='true'
                    id='messages' className='border border-dark border-2 bg-white p-2 mb-3'
                    style={{ height: '500px' }}
                >
                    {error}
                </Container>
            );
        } else if (!isLoaded) {
            return (
                <Container fluid='true'
                    id='messages' className='border border-dark border-2 bg-white p-2 mb-3'
                    style={{ height: '500px' }}
                >
                    Loading...
                </Container>
            );
        } else {
            return (
                <>
                    {info.length > 0 ? (
                        <Container fluid='true'
                            id='messages' className='border border-dark border-2 bg-white p-2 mb-3'
                            style={{ height: '500px', overflowY: 'scroll' }}
                        >
                            {info.slice(-100).map((info, index) => (
                                <Container key={index} fluid='true' id='message'>
                                    <strong>{info.user}:</strong> {info.message}
                                </Container>
                            ))}
                        </Container>
                    ) : (
                        <Container fluid='true'
                            id='messages' className='border border-dark border-2 bg-white p-2 mb-3'
                            style={{ height: '500px' }}
                        >
                            <Container fluid='true' id='message'>
                                No messages
                            </Container>
                        </Container>
                    )}
                    <Container fluid='true'>
                        <MessageBox sendMessage={this.sendMessage} />
                    </Container>
                </>
            );
        }
    }
}

export default Chat;