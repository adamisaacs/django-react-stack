import React from 'react';
import {
    Container,
    Button,
    Form,
} from 'react-bootstrap';


function TrainingComponent(props) {
    const trainNetwork = (e) => {
        e.preventDefault();

        props.updateLoading(true);

        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;

        fetch('https://192.168.1.3:8000/api/neuralnets/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                props.updateData(data);
                props.updateLoading(false);
            })
            .catch((error) => {
                console.error(error);
                props.updateLoading(false);
            })
    }

    return (
        <Form onSubmit={trainNetwork}>
            <Container fluid='true' className='d-flex justify-content-end'>
                <Button variant='success' type='submit' className='mt-3'>
                    Train Network
                </Button>
            </Container>
        </Form>
    );
}

class NeuralNet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            isLoading: false,
        }
    }

    updateLoading = (bool) => {
        this.setState({
            isLoading: bool,
        })
    }

    updateData = (data) => {
        this.setState({
            isLoaded: true,
            data: data,
        });
    }

    render() {
        const { error, isLoaded, data, isLoading } = this.state;

        if (error) {
            return (
                <Container fluid='true'>
                    {error}
                </Container>
            );
        } else if (isLoading) {
            return (
                <Container fluid='true'>
                    Training...
                    <TrainingComponent updateData={this.updateData} updateLoading={this.updateLoading} />
                </Container>
            );
        } else if (!isLoaded) {
            return (
                <Container fluid='true'>
                    No data.
                    <TrainingComponent updateData={this.updateData} updateLoading={this.updateLoading} />
                </Container>
            );
        } else {
            return (
                <Container fluid='true'>
                    Model: {data.model}
                    {/* Accuracy: {(data.accuracy * 100).toFixed(2)}% */}
                    <TrainingComponent updateData={this.updateData} updateLoading={this.updateLoading} />
                </Container>
            );
        }
    }
}

export default NeuralNet;