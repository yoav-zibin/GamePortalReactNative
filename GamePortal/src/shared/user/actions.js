export function setLoggedInUser(username, avatarURL, firebaseUserId) {
    return {
        type: 'LOGGED_IN',
        username: username,
        avatarURL: avatarURL,
        firebaseUserId: firebaseUserId,
    }
}

export function setLoggedOut() {
    return {
        type: 'LOGGED_OUT'
    }
}

export function setLoggingIn() {
    return {
        type: 'LOGGING_IN',
    }
}