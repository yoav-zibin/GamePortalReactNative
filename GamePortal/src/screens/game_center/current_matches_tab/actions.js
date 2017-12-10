export function setGameForOngoingMatches(gameId) {
    return {
        type: 'SET_GAME_FOR_ONGOING_MATCHES',
        gameId: gameId
    }
}