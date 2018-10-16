import _ from 'lodash';

export const handleError = (dispatch, error, type) => {
    const foundError = _.get(error, 'response.data.error') || { error };
    let actionType = type + '_FAILED';
    let errorMessage;
    if (foundError.error.response) {
        errorMessage = processStatus(foundError.error.response.status);
    } else {
        errorMessage = 'Facing some issue with server. Please try again later!'
    }
    return dispatch({
        type: actionType,
        payload: errorMessage
    });
};

const processStatus = (statusCode) => {
    switch (statusCode) {
        case 400:
            return 'Can not process bad request. Please try again later!';
        case 401:
            return 'You are not authorized to send request. Please try again later!';
        case 403:
            return 'Server is refusing your request now. Please try again later!';
        case 404:
            return 'Can not process your request now. Please try again later!';
        case 500:
            return 'Server is not responding. Please try again later!';
        default:
            return 'Can not send your mail now. Please try again later!';
    }
};