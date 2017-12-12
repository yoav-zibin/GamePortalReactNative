export function reset() {
    return {
        type: 'RESET'
    }
}

export function setGameSpecId(gameSpecId) {
    return {
        type: 'SET_GAME_SPEC_ID',
        gameSpecId: gameSpecId
    }
}

export function setMatchId(matchId) {
    return {
        type: 'SET_MATCH_ID',
        matchId: matchId
    }
}

export function setBoardImage(url, height, width) {
    return {
        type: 'SET_BOARD_IMAGE',
        imageURL: url,
        width: width,
        height: height
    }
}

export function addPiece(pieceIndex, pieceObject) {
    return {
        type: 'ADD_PIECE',
        index: pieceIndex,
        piece: pieceObject
    }
}

export function setScale(height, width) {
    return {
        type: 'SET_SCALE',
        scaleHeight: height,
        scaleWidth: width
    }
}

export function addElement(elementId, elementObject) {
    return {
        type: 'ADD_ELEMENT',
        id: elementId,
        element: elementObject
    }
}

export function addImageToElement(elementId, imageIndex, imageURL) {

    return {
        type: 'ADD_IMAGE_TO_ELEMENT',
        elementId: elementId,
        index: imageIndex,
        url: imageURL
    }
}

export function setPieceState(pieceIndex, lastUpdatedOn, newState) {
    return {
        type: 'SET_PIECE_STATE',
        pieceIndex: pieceIndex,
        lastUpdatedOn: lastUpdatedOn,
        newState: newState
    }
}

export function setPieceLocation(pieceIndex, x, y, newZ) {
    return {
        type: 'SET_PIECE_LOCATION',
        pieceIndex: pieceIndex,
        x: x,
        y: y,
        newZ: newZ
    }
}

export function setSelectedPiece(pieceIndex) {
    return {
        type: 'SET_SELECTED_PIECE',
        pieceIndex: pieceIndex
    }
}

export function togglePiece(pieceIndex, numberOfImages) {
    return {
        type: 'TOGGLE_PIECE',
        pieceIndex: pieceIndex,
        numberOfImages: numberOfImages
    }
}