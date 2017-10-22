/*
Set the currently logged in user data
 */
export function setLoggedInUser(username, avatarURL, firebaseUserId) {
    return {
        type: 'LOGGED_IN',
        username: username,
        avatarURL: avatarURL,
        firebaseUserId: firebaseUserId,
    }
}

/*
Set that the user has logged out
 */
export function setLoggedOut() {
    return {
        type: 'LOGGED_OUT'
    }
}

/*
Set that a user is current in the process of logging in
 */
export function setLoggingIn() {
    return {
        type: 'LOGGING_IN',
    }
}