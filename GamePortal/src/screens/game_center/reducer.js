import {initialState} from "../../store";

export const GameCenterReducer = (gameCenterState = initialState.gameCenter, action) => {

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

        case 'ADD_RECENTLY_ADDED_GAME': {
            let updatedRecentlyAddedGames = Object.assign([], gameCenterState.recentlyAddedGames);
            updatedRecentlyAddedGames.push(action.recentlyAddedGame);

            return Object.assign({}, gameCenterState, {
                recentlyAddedGames: updatedRecentlyAddedGames
            });
        }

        case 'RESET_RECENTLY_ADDED_GAMES': {
            return Object.assign({}, gameCenterState, {
                recentlyAddedGames: []
            })
        }


        case 'ADD_PREVIOUSLY_PLAYED_GAME': {
            let updatedPreviouslyPlayedGames = Object.assign([], gameCenterState.previouslyPlayedGames);
            updatedPreviouslyPlayedGames.push(action.previouslyPlayedGame);

            return Object.assign({}, gameCenterState, {
                previouslyPlayedGames: updatedPreviouslyPlayedGames
            });
        }


        case 'RESET_PREVIOUSLY_PLAYED_GAMES': {
            return Object.assign({}, gameCenterState, {
                previouslyPlayedGames: []
            })
        }

        case 'SET_SEARCH_RESULTS': {
            return Object.assign({}, gameCenterState, {
                searchResults: action.searchResults
            })
        }

        case 'RESET_SEARCH_RESULTS': {
            return Object.assign({}, gameCenterState, {
                searchResults: {}
            })
        }


        default: {
            return gameCenterState;
        }
    }
};