import React, { useRef, useEffect, useState } from 'react';
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

            isTesting: false,
            prediction: null,
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

    testModel = (e) => {
        e.preventDefault();
        const csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        const modelURL = `${e.target.elements.modelURL.value}predict/`;
        const imageData = e.target.elements.imageData.value;
        const imageDataArray = imageData.split(',');
        const imageData2D = Array.from({ length: 28 }, (_, row) => {
            return Array.from({ length: 28 }, (_, col) => {
                return parseFloat(imageDataArray[row * 28 + col], 10);
            });
        });
        console.log(imageData2D);
        this.setState({
            isTesting: true,
        })
        fetch(modelURL, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageData: imageData2D,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    isTesting: false,
                    prediction: data,
                })
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isTesting: false,
                })
            })
    }

    clearPrediction = () => {
        console.log('got here');
        this.setState({
            prediction: null,
        });
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
            isTesting,
            prediction,
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
                    className='d-flex flex-column border border-dark'
                >
                    <Container fluid='true'
                        className='bg-light p-4 border-bottom border-dark d-flex flex-wrap justify-content-center align-items-center'
                    >
                        {
                            modelsLoading ?
                                <Container fluid='true'>Models loading...</Container>
                                :
                                <>
                                    <h3 className='w-100 mb-3'>Choose your model:</h3>
                                    {Array(3).fill(null).map((value, index) => (
                                        modelsList[index] ?
                                            <Container fluid='true' key={index} className='me-4 w-100' style={{ maxWidth: '200px' }}>
                                                <Form onSubmit={this.getModel}>
                                                    <input type="hidden" name="modelURL" value={modelsList[index].url} />
                                                    <Button variant='text'
                                                        type='submit'
                                                        className='w-100 bg-white border border-3 border-dark mb-3'
                                                    >
                                                        <span className='fs-4 text-break'>{modelsList[index].name}</span><br />
                                                        <small style={{ fontSize: '10px' }}>{formattedDates[index]}</small>
                                                    </Button>
                                                </Form>
                                            </Container>
                                            :
                                            <Container fluid='true' key={index} className='me-4 mb-3'>
                                                <Form onSubmit={this.createModel} className='d-flex flex-column align-items-end'>
                                                    <Form.Control
                                                        placeholder='Model name'
                                                        name='modelName'
                                                        maxLength='20'
                                                        className='mb-2'
                                                        required
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
                        className='p-4 bg-white'
                    >
                        {
                            modelLoading ? <Container fluid='true'>Model loading...</Container>
                                :
                                modelLoaded ?
                                    <>
                                        <Container fluid='true' className='d-flex flex-column justify-content-center align-items-center mb-4'>
                                            <h2 className='text-center mb-1'>{modelData.name}</h2>
                                            {
                                                isTraining ?
                                                    <Container fluid='true' className='mb-1'>
                                                        Accuracy: Training...
                                                    </Container>
                                                    :
                                                    modelData.accuracy !== '' ?
                                                        <Container fluid='true' className='mb-1'>
                                                            Accuracy:&nbsp;
                                                            {(modelData.accuracy * 100).toFixed(2)}%
                                                        </Container>
                                                        :
                                                        <Container fluid='true' className='mb-1'>
                                                            Model is untrained.
                                                        </Container>
                                            }
                                            <Container fluid='true' className='d-flex'>
                                                <Form onSubmit={this.trainModel} className='mx-1'>
                                                    <input type="hidden" name="modelURL" value={modelData.url} />
                                                    <input type="hidden" name="model" value={modelData.model} />
                                                    <Button variant='success' size='sm' type='submit'>
                                                        <small>Train 1 epoch</small>
                                                    </Button>
                                                </Form>
                                                <Form onSubmit={this.trainModel} className='mx-1'>
                                                    <input type="hidden" name="modelURL" value={modelData.url} />
                                                    <input type="hidden" name="model" value={modelData.model} />
                                                    <Button variant='success' size='sm' type='submit'>
                                                        <small>Train 1 epoch</small>
                                                    </Button>
                                                </Form>
                                                <Form onSubmit={this.trainModel} className='mx-1'>
                                                    <input type="hidden" name="modelURL" value={modelData.url} />
                                                    <input type="hidden" name="model" value={modelData.model} />
                                                    <Button variant='success' size='sm' type='submit'>
                                                        <small>Train 1 epoch</small>
                                                    </Button>
                                                </Form>
                                            </Container>
                                        </Container>
                                        <Container fluid='true' className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                            <DrawingArea testModel={this.testModel} modelURL={modelData.url} clearPrediction={this.clearPrediction} />
                                            <Container fluid='true' className='text-center border border-dark my-2'>
                                                {
                                                    isTesting ?
                                                        <>
                                                            <h5 className='border-bottom border-dark p-2'>Prediction</h5>
                                                            <span className='p-2 fs-1'>...</span>
                                                        </>
                                                        : prediction != null ?
                                                            <>
                                                                <h5 className='border-bottom border-dark p-2'>Prediction</h5>
                                                                <span className='p-2 fs-1'>{prediction}</span>
                                                            </>
                                                            :
                                                            <>
                                                                <h5 className='border-bottom border-dark p-2'>Prediction</h5>
                                                                <span className='p-2 fs-1'>N/A</span>
                                                            </>
                                                }
                                            </Container>
                                        </Container>
                                    </>
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


function DrawingArea(props) {
    const canvasRef = useRef(null);
    const downsizedCanvasRef = useRef(null);
    const [rect, setRect] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [processedImageData, setProcessedImageData] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        setRect(canvas.getBoundingClientRect());
        window.addEventListener("resize", updateRect);
        window.addEventListener("scroll", updateRect);

        return () => {
            window.removeEventListener("resize", updateRect);
            window.removeEventListener("scroll", updateRect);
        };

        function updateRect() {
            setRect(canvas.getBoundingClientRect());
        }
    }, [canvasRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const downsizedCanvas = downsizedCanvasRef.current;
        const downsizedContext = downsizedCanvas.getContext('2d');
        context.strokeStyle = 'black';
        context.lineWidth = 25;
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        let isDrawing = false;

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
        }

        function startDrawing(event) {
            isDrawing = true;
            context.beginPath();
            context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
        }
        function draw(event) {
            if (isDrawing) {
                context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
                context.stroke();
            }
            drawNewCanvas();
        }
        function stopDrawing() {
            isDrawing = false;
        }
        function drawNewCanvas() {
            const img = new Image();
            img.src = canvas.toDataURL();
            downsizedContext.drawImage(img, 0, 0, 28, 28);
            const image = downsizedContext.getImageData(0, 0, 28, 28);
            const data = image.data;
            setImageData(data);
        }
    }, [rect]);

    useEffect(() => {
        const data = imageData;

        if (data) {
            // downsize array to 28x28
            let newImageData = [];
            for (var y = 0; y < 28; y++) {
                var row = [];
                for (var x = 0; x < 28; x++) {
                    var index = (y * 28 + x) * 4 + 3;
                    var value = data[index] / 255;
                    row.push(value);
                }
                newImageData.push(row);
            }
            setProcessedImageData(newImageData);
        }
        else {
            setProcessedImageData(null);
        }
    }, [imageData]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const downsizedCanvas = downsizedCanvasRef.current;
        const downsizedContext = downsizedCanvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        downsizedContext.clearRect(0, 0, downsizedCanvas.width, downsizedCanvas.height);

        setImageData(null);
        props.clearPrediction();
    }


    return (
        <>
            <canvas
                ref={canvasRef}
                id='canvas'
                height='280px'
                width='280px'
                className='border border-5 border-dark'
            ></canvas>
            <canvas
                ref={downsizedCanvasRef}
                id='downsizedCanvas'
                height='28px'
                width='28px'
                className='border border-3 border-dark'
            ></canvas>
            <Container fluid='true' className='d-flex flex-column align-items-center'>
                <Form onSubmit={props.testModel} className='mb-2'>
                    <input type="hidden" name="modelURL" value={props.modelURL} />
                    <input type="hidden" name="imageData" value={processedImageData} />
                    <Button variant='primary' type='submit'>
                        Test
                    </Button>
                </Form>
                <Button variant='dark' onClick={clearCanvas}>
                    Clear
                </Button>
            </Container>
        </>
    );
}