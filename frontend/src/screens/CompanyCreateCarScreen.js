import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listCarDetails, createCar } from '../actions/carActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { CAR_UPDATE_RESET } from '../constants/carConstants'

const CompanyCreateCarScreen = ({ location, history, match }) => {

    //retrieve car ID from url
    const carId = match.params.id

    const carCreate = useSelector(state => state.carCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, car: createdCar } = carCreate

    // car intial state
    const [image, setImage] = useState('')
    const [plate, setPlate] = useState('')
    const [model, setModel] = useState(0)
    const [color, setColor] = useState('')
    const [mileage, setMileage] = useState(0)
    const [status, setStatus] = useState('')
    const [price, setPrice] = useState(0)

    const dispatch = useDispatch()

    const carDetails = useSelector((state) => state.carDetails)
    const { loading, error, car } = carDetails

    const companyLogin = useSelector(state => state.companyLogin)
    const { companyInfo } = companyLogin

    // get company ID from state to be sent with the create car request
    //const companyId = companyInfo._id

    console.log(companyInfo)

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: CAR_UPDATE_RESET })
            history.push('/company/carslist')
        } else {
            if (car._id !== carId) {
                dispatch(listCarDetails(carId))
            } else {
                //setImage(car.image)
                setPlate(car.carPlate)
                setModel(car.carModel)
                setColor(car.color)
                setMileage(car.totalMileage)
                setStatus(car.status)
                setPrice(car.price)
            }
        }
    }, [dispatch, history, carId, car, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            //companyId, image, carPlate, carModel, color, totalMileage, price, status, benefits
            createCar({
                plate,
                model,
                color,
                mileage,
                price,
                //status,
            })
        )
    }

    return (
        <div>
            <Container className='justify-content-center p-3'>
                <h2 className='text-center mt-5'>Fill Car Information</h2>
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                {loadingCreate && <Loader />}
                {successCreate && <Message>Car Successfully Added !!</Message>}
                <Row className='mt-5 mb-5'>
                    <Col>
                        <h2 className='text-center'></h2>

                        <Form onSubmit={submitHandler}>

                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId='plate'>
                                        <Form.Label>Plate</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter plate'
                                            value={plate}
                                            onChange={(e) => setPlate(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='model'>
                                        <Form.Label>Model</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter model'
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='color'>
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter color'
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId='mileage'>
                                        <Form.Label>Mileage</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter mileage'
                                            value={mileage}
                                            onChange={(e) => setMileage(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='status'>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='price'>
                                        <Form.Label>Price / day</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Col className='text-center'>
                                <Button className='text-center' type='submit' variant='primary'>
                                    Add Car
                                </Button>
                            </Col>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CompanyCreateCarScreen
