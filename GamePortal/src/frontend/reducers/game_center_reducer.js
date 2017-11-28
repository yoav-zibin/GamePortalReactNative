import { initialState } from '../store/initial_state';

export const gameCenterReducer = (state = initialState.gameCenter, action) => {
    switch (action.type) {
        case 'SWITCH_GAME':
            let game = action.game;
            return Object.assign({}, state, {
                currentGameId: game.specId,
                currentGameName: game.specName,
                boardImageId: game.board.imageId
            });
        default:
            return state;
    }
};