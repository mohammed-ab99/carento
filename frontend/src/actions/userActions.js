import axios from 'axios'
import {
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS,
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        //config for sending requests
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //make request
        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //users local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({//send error message in case of failuer
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/login'
}

export const register = (name, nationalID, pnum, email, password, dob) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        //config for sending requests
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //make request
        const { data } = await axios.post('/api/users/', { name, nationalID, pnum, email, password, dob }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        //login user after successful registeration
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //users local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({//send error message in case of failuer
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        //access logged in user
        const {
            userLogin: { userInfo },
        } = getState()

        //pass auth token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        //get request to user profile
        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) { //send error message and logout user
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        //access logged in user
        const {
            userLogin: { userInfo },
        } = getState()

        //pass auth token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        //put request to user profile
        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        //save to storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

/**COMPANY ACTIONS */

//!! after registeration, company will be inserted to DB with pending status awaitng for manual approval
export const companyRegister = (name, email, contactnum, address, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        //config for sending requests
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //make request
        const { data } = await axios.post('/api/companies/', { name, email, contactnum, address, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        //login user after successful registeration
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //users local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({//send error message in case of failuer
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/users`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        })
    }
}