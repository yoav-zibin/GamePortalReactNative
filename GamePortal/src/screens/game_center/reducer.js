import {initialState} from "../../frontend/store/initial_state";

export const gameCenterReducer = (gameCenterState = initialState.gameCenter, action) => {

    switch(action.type) {

        case 'SWITCH_GAME_CENTER_TAB': {
            return Object.assign({}, gameCenterState, {
                tab: action.newTab,
                gameForOngoingMatches: null
            });
        }


        case 'SET_GAME_SPECS': {
            return Object.assign({}, gameCenterState, {
                gameSpecs: action.gameSpecs,
            });
        }



        case 'SET_MATCHES': {
            return Object.assign({}, gameCenterState, {
                matches: action.matches
            });
        }

        case 'SET_GAME_FOR_ONGOING_MATCHES': {
            return Object.assign({}, gameCenterState, {
                gameForOngoingMatches: action.gameId
            })
        }


        default: {
            return gameCenterState;
        }
    }
};