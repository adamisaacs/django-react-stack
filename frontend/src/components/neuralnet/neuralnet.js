import React from 'react';
import {
    Container,
    Button,
    Form,
} from 'react-bootstrap';


class NeuralNet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,

            modelsLoading: false,
            modelsList: [],

            modelLoading: false,
            modelLoaded: false,
            modelData: [],

            isTraining: false,
        }
    }

    componentDidMount() {
        this.getModels();
    }

    getModels = () => {
        this.setState({
            modelsLoading: true,
        })
        fetch('https://192.168.1.3:8000/api/neuralnets/', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    modelsList: data,
                    modelsLoading: false,
                })
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    error: error,
                    modelsLoading: false,
                })
            })
    }

    createModel = (e) => {
        e.preventDefault();
        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        const modelName = e.target.elements.modelName.value;
        fetch('https://192.168.1.3:8000/api/neuralnets/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: modelName
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const newList = this.state.modelsList.concat(data);
                this.setState({
                    modelsList: newList,
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    getModel = (e) => {
        e.preventDefault();
        const modelURL = e.target.elements.modelURL.value;
        this.setState({
            modelLoading: true,
        })
        fetch(modelURL, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    modelData: data,
                    modelLoading: false,
                    modelLoaded: true,
                })
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    error: error,
                    modelLoading: false,
                })
            })
    }

    trainModel = (e) => {
        e.preventDefault();
        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        const model = e.target.elements.model.value;
        const modelURL = e.target.elements.modelURL.value;
        this.setState({
            isTraining: true,
        })
        fetch(modelURL, {
            method: 'PUT',
            headers: {
                'X-CSRFToken': csrf_token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    modelData: data,
                    isTraining: false,
                })
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    error: error,
                    isTraining: false,
                })
            })
    }


    render() {
        const {
            error,
            modelsLoading,
            modelsList,
            modelLoading,
            modelLoaded,
            modelData,
            isTraining,
        } = this.state;

        const formattedDates = [];
        modelsList.forEach(model => {
            const dateObj = new Date(model.created);
            const formatted = dateObj.toLocaleString();
            formattedDates.push(formatted);
        });

        if (error) {
            return (
                <Container fluid='true'>
                    ERROR: {error}
                </Container>
            );
        } else {
            return (
                <Container fluid='true'
                    id="neuralnet-app"
                    className='d-flex border border-dark'
                >
                    <Container fluid='true'
                        className='bg-light p-4 border-end border-dark d-flex flex-column align-items-center'
                        style={{ maxWidth: '250px' }}
                    >
                        {
                            modelsLoading ?
                                <Container fluid='true'>Models loading...</Container>
                                :
                                <>
                                    <h3 className='text-center fs-4 mb-4 fw-normal'>Choose a Model</h3>
                                    {Array(3).fill(null).map((value, index) => (
                                        modelsList[index] ?
                                            <Container fluid='true' key={index} className='mb-4 w-100'>
                                                <Form onSubmit={this.getModel}>
                                                    <input type="hidden" name="modelURL" value={modelsList[index].url} />
                                                    <Button variant='text'
                                                        type='submit'
                                                        className='w-100 bg-white button-hover border border-3 border-dark'
                                                    >
                                                        <span className='fs-4'>{modelsList[index].name}</span><br />
                                                        <small style={{ fontSize: '10px' }}>{formattedDates[index]}</small>
                                                    </Button>
                                                </Form>
                                            </Container>
                                            :
                                            <Container fluid='true' key={index} className='mb-4'>
                                                <Form onSubmit={this.createModel} className='d-flex flex-column align-items-end'>
                                                    <Form.Control
                                                        placeholder='Name your model'
                                                        name='modelName'
                                                        maxLength='20'
                                                        className='mb-2'
                                                    />
                                                    <Button variant='dark' type='submit'>
                                                        Create
                                                    </Button>
                                                </Form>
                                            </Container>
                                    ))}
                                </>
                        }
                    </Container>
                    <Container fluid='true'
                        className='flex-fill p-3 bg-white'
                    >
                        {
                            modelLoading ? <Container fluid='true'>Model loading...</Container>
                                :
                                modelLoaded ?
                                    <Container fluid='true'>
                                        <h2>{modelData.name}</h2>
                                        {
                                            isTraining ?
                                                <Container fluid='true'>
                                                    Accuracy on test set: Training...
                                                </Container>
                                                :
                                                modelData.accuracy != '' ?
                                                    <Container fluid='true'>
                                                        Accuracy on test set:&nbsp;
                                                        {(modelData.accuracy * 100).toFixed(2)}%
                                                    </Container>
                                                    :
                                                    <Container fluid='true'>
                                                        Model is untrained.
                                                    </Container>
                                        }
                                        <Container fluid='true' className='mb-3'>
                                            <Form onSubmit={this.trainModel}>
                                                <input type="hidden" name="modelURL" value={modelData.url} />
                                                <input type="hidden" name="model" value={modelData.model} />
                                                <Button variant='success' type='submit'>
                                                    Train model (5 epochs)
                                                </Button>
                                            </Form>
                                        </Container>
                                    </Container>
                                    :
                                    <Container fluid='true'>Load a model to start.</Container>
                        }
                    </Container>
                </Container>
            );
        }
    }
}

export default NeuralNet;