import {
    postUser,
    deleteSession,
    postSession
} from "../utils/session";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER"
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"


export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user,
})

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
})

export const receiveErrors = errors => {
    return({
        type: RECEIVE_SESSION_ERRORS,
        errors: errors
    })
}


//we are getting the dispatch in these action creators from the thunk middleware
// export const createNewUser = formUser => dispatch => (
//     postUser(formUser).then(user => dispatch(receiveCurrentUser(user))
//     ),err => (
//         dispatch(receiveErrors(err.responseJSON))
// ));

export const createNewUser = formUser => dispatch => {
    return(
        postUser(formUser).then(user => dispatch(receiveCurrentUser(user))
        ,err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
    )
}

// export const logIn = formUser => dispatch => postSession(formUser)
//     .then(user => dispatch(receiveCurrentUser(user)));

export const logIn = formUser => dispatch => {
    return(
        postSession(formUser).then(user => dispatch(receiveCurrentUser(user))
        ,err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
    )
}


export const logout = () => dispatch => deleteSession()
    .then(() => dispatch(logoutCurrentUser()));