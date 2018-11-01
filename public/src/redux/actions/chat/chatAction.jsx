export const FETCH_LANGUAGE = 'FETCH_LANGUAGE';

export const setLanguage = (payload) => dispatch => {
    dispatch({
        type: FETCH_LANGUAGE,
        payload
    })
}