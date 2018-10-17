export const FETCH_LOGIN_USER = 'FETCH_LOGIN_USER';
export const FETCH_SESSION_DATA = 'FETCH_SESSION_DATA';

export const fetchLogin = (payload) => dispatch => {
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
        });
}

export const initializeSession = () => dispatch => {
    fetch('/api/session', {
        include: 'credentials'
    })
        .then(res => res.json())
        .then(sessionData => {
            console.log(sessionData);
            dispatch({
                type: FETCH_SESSION_DATA,
                payload: sessionData[0]
            })
        }).catch(err => {
            console.log(err);
        })
}
