export const FETCH_LOGIN_USER = 'FETCH_LOGIN_USER';
export const FETCH_SESSION_DATA = 'FETCH_SESSION_DATA';
export const FETCH_FORGOT_SESSION = 'FETCH_FORGOT_SESSION';

export const fetchLogin = (payload, history) => dispatch => {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },

        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: FETCH_LOGIN_USER,
                payload: data.token[0]
            })
        })
        .then(() => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
}

export const initializeSession = () => dispatch => {
    fetch('/api/session', {
        include: 'credentials'
    })
        .then(res => res.json())
        .then(sessionData => {
            dispatch({
                type: FETCH_SESSION_DATA,
                payload: sessionData
            })
        }).catch(err => {
            console.log(err);
        })
}

export const initializeForgotSession = () => dispatch => {
    fetch('/api/session', {
        include: 'credentials'
    })
        .then(res => res.json())
        .then(sessionData => {
            dispatch({
                type: FETCH_FORGOT_SESSION,
                payload: sessionData
            })
        }).catch(err => {
            console.log(err);
        })
}