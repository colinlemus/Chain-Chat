export const SEND_MAIL_REQUEST = 'SEND_MAIL_REQUEST';
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS';
export const SEND_MAIL_FAILED = 'SEND_MAIL_FAILED';

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
            console.log(data.token[0]);
            dispatch({
                type: FETCH_LOGIN_USER,
                payload: data.token[0]
            })
        });
}