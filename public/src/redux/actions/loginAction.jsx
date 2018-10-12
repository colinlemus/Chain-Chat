export const FETCH_LOGIN_USER = 'FETCH_LOGIN_USER';

export const fetchLogin = (payload) => dispatch => {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },

        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_LOGIN_USER,
            payload: data
        }));
}