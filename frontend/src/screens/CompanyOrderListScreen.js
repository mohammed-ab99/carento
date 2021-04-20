import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const CompanyOrderListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    // const userLogin = useSelector((state) => state.userLogin)
    // const { userInfo } = userLogin

    const companyLogin = useSelector(state => state.companyLogin)
    const { companyInfo } = companyLogin

    useEffect(() => {
        dispatch(listOrders())

        //TODO: add checking if company or not
        /*         if (userInfo && userInfo.isAdmin) {
                    dispatch(listOrders())
                } else {
                    history.push('/login')
                } */
    }, [dispatch, history, companyInfo])

    //TODO: add this inside return
    /*     {loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : ( */

    //TODO: map through orders inside DB

    return (
        <>
            <h1>Orders</h1>

            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/*                     <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                            {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                            ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                        </td>
                        <td>
                            {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                            ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                        </td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    Details
                                </Button>
                            </LinkContainer>
                        </td>
                    </tr> */}

                </tbody>
            </Table>

        </>
    )
}

export default CompanyOrderListScreen