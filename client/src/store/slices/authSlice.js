import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        error: null,
        message: null,
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        // Register
        registerRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null; 
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        registerFailed: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },

        // OTP Verification
        otpVerificationRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        otpVerificationSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        otpVerificationFailed: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },

        // Login
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.isAuthenticated = true;
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.isAuthenticated = false;
        },

        // Logout
        logoutRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.message = action.payload.message;
        },
        logoutFailed: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },




        resetAuthSlice: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null;
            state.user = null;
            state.isAuthenticated = state.isAuthenticated;
        },
    },
});

export const {
    registerRequest,
    registerSuccess,
    registerFailed,
    otpVerificationRequest,
    otpVerificationSuccess,
    otpVerificationFailed,
    loginRequest,
    loginSuccess,
    loginFailed,
    logoutRequest,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;


export const resetAuthSlice = () => (dispatch) => {
    dispatch(authSlice.actions.resetAuthSlice());
}

export const register = (data) => async (dispatch) => {
    dispatch(registerRequest());
    await axios.post('/api/v1/register', data, {
        withCredentials: true,
        headers: {
            "Content-type": "application/json",
        },
    }).then((res) => {
        dispatch(registerSuccess(res.data));
    }).catch(error => {
        dispatch(registerFailed(error.response.data.message));
    });
};

export const otpVerification = (data) => async (dispatch) => {
    dispatch(otpVerificationRequest());
    await axios.post('/api/v1/verify', data, {
        withCredentials: true,
        headers: {
            "Content-type": "application/json",
        },
    }).then(res => {
        dispatch(otpVerificationSuccess(res.data));
    }).catch(error => {
        dispatch(otpVerificationFailed(error.response.data.message));
    });
};

export const login = (data) => async (dispatch) => {
    dispatch(loginRequest());
    await axios.post('/api/v1/login', data, {
        withCredentials: true,
        headers: {
            "Content-type": "application/json",
        },
    }).then(res => {
        dispatch(loginSuccess(res.data));
    }).catch(error => {
        dispatch(loginFailed(error.response.data.message));
    });
};

export const logout = () => async (dispatch) => {
    dispatch(logoutRequest());
    await axios.get('/api/v1/logout', {
        withCredentials: true,
    }).then(res => {
        dispatch(logoutSuccess(res.data.message));
        dispatch(authSlice.actions.resetAuthSlice());
    }).catch(error => {
        dispatch(logoutFailed(error.response.data.message));
    });
};
