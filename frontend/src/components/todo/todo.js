import React, { useState } from 'react';
import {
    Container,
    Button,
    Modal,
    Form,
    Table,
} from 'react-bootstrap';
import './todo.css';


function Edit(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = (e) => {
        e.preventDefault();

        const form = e.target;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            const jsonData = JSON.stringify(data);

            fetch(props.info.url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            })
                .then((response) => response.json())
                .then((data) => {
                    handleClose();
                    props.updateData(data);
                })
                .catch((error) => console.error(error));
        }
    }

    return (
        <>
            <Button variant='link' onClick={handleShow} className='p-0'>
                <i className='bi bi-pencil-square text-dark fs-4 lh-1'></i>
            </Button>

            <Modal
                className='todo-modal'
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                maxLength='60'
                                required
                                defaultValue={props.info.title}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                maxLength='200'
                                required
                                defaultValue={props.info.description}
                            />
                        </Form.Group>
                        <Container fluid='true' className='d-flex justify-content-end'>
                            <Button variant='secondary' onClick={handleClose} className='mt-3 me-2'>
                                Cancel
                            </Button>
                            <Button variant='primary' type='submit' className='mt-3'>
                                Save
                            </Button>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

function Add(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const jsonData = JSON.stringify(data);

        fetch('http://192.168.1.3:8000/api/todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then((response) => response.json())
            .then((data) => {
                handleClose();
                props.addData(data);
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Button variant='success'
                onClick={handleShow}
                className='px-4 py-2 shadow-dark'
            >
                <i className='bi bi-plus-square fs-3 me-2'></i>
                <span className='fs-4 mb-1'>Add Item</span>
            </Button>

            <Modal
                className='todo-modal'
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                maxLength='60'
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                maxLength='200'
                                required
                            />
                        </Form.Group>

                        <Container fluid='true' className='d-flex justify-content-end'>
                            <Button variant='secondary' onClick={handleClose} className='mt-3 me-2'>
                                Cancel
                            </Button>
                            <Button variant='success' type='submit' className='mt-3'>
                                Add Item
                            </Button>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

function Delete(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = (e) => {
        e.preventDefault();

        fetch(props.info.url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                handleClose();
                props.deleteData(props.info);
            })
            .catch((error) => console.error(error));
    }
    return (
        <>
            <Button variant='link' onClick={handleShow} className='p-0 mt-2'>
                <i className='bi bi-trash3 text-danger fs-4 lh-1'></i>
            </Button>

            <Modal
                className='todo-modal'
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tr>
                            <td className='px-2 py-1 fs-5'>
                                Title
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>
                                {props.info.title}
                            </td>
                        </tr>
                        <hr className='m-2' />
                        <tr>
                            <td className='px-2 py-1 fs-5'>
                                Description
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>
                                {props.info.description}
                            </td>
                        </tr>
                    </Table>
                    <Container fluid='true' className='d-flex justify-content-end'>
                        <Button variant='secondary' onClick={handleClose} className='mt-3 me-2'>
                            Cancel
                        </Button>
                        <Button variant='danger' onClick={handleDelete} className='mt-3'>
                            Confirm Delete
                        </Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            info: [],
        }
    }

    updateData = (data) => {
        const updatedData = this.state.info;
        const index = updatedData.findIndex(info => info.url === data.url);
        updatedData[index] = data;
        this.setState({
            info: updatedData,
        });
    }

    addData = (data) => {
        const updatedData = this.state.info;
        updatedData.push(data);
        this.setState({
            info: updatedData,
        });
    }

    deleteData = (data) => {
        const updatedData = this.state.info;
        const index = updatedData.findIndex(info => info.url === data.url);
        updatedData.splice(index, 1);
        this.setState({
            info: updatedData,
        });
    }

    runAPI() {
        fetch('http://192.168.1.3:8000/api/todos/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        info: result,
                    });
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
    }


    render() {
        const { error, isLoaded, info } = this.state;

        if (error) {
            return (
                <Container fluid='true'
                    className='text-center fs-3'
                    style={{ height: '500px' }}
                >
                    {error}
                </Container>
            );
        } else if (!isLoaded) {
            return (
                <Container fluid='true'
                    className='mx-auto border border-dark shadow-dark'
                    style={{ maxWidth: '600px', marginBottom: '300px' }}
                >
                    <Container fluid='true' className='todo-item p-4'>
                        <Container fluid='true'>
                            <span className='fs-4 d-block mb-2 pb-2 border-bottom'>
                                Loading...
                            </span>
                            <p className='m-0 fs-6'>
                                Loading...
                            </p>
                        </Container>
                    </Container>
                </Container>
            );
        } else {
            return (
                <>
                    {info.length > 0 ? (
                        <Container fluid='true'
                            className='mx-auto border border-dark shadow-dark'
                            style={{ maxWidth: '600px' }}
                        >
                            {info.map((info, index) => (
                                <Container key={index}
                                    fluid='true'
                                    className='todo-item d-flex justify-content-between align-items-center p-4'
                                >
                                    <Container fluid='true' className='me-4'>
                                        <span className='fs-4 d-block mb-2 pb-2 border-bottom'>
                                            {info.title}
                                        </span>
                                        <p className='m-0 fs-6'>
                                            {info.description}
                                        </p>
                                    </Container>
                                    <Container fluid='true' className='d-flex flex-column'>
                                        <Edit info={info} updateData={this.updateData} />
                                        <Delete info={info} deleteData={this.deleteData} />
                                    </Container>
                                </Container>
                            ))}
                        </Container>
                    ) : (
                        <Container fluid='true'
                            className='mx-auto border border-dark shadow-dark'
                            style={{ maxWidth: '600px' }}
                        >
                            <Container fluid='true' className='todo-item d-flex justify-content-between align-items-center border-bottom p-4'>
                                <Container fluid='true'>
                                    <span className='fs-3'>No items found</span>
                                </Container>
                            </Container>
                        </Container>
                    )}
                    <Container fluid='true' className='mt-3 text-center' style={{ height: '80px' }}>
                        <Add addData={this.addData} />
                    </Container>
                </>
            );
        }
    }
}

export default Todo;