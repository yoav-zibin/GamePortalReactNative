import { connect } from 'react-redux';
import NewMatchTabComponent from "./component";
import {
    addPreviouslyPlayedGame, addRecentlyAddedGame, resetPreviouslyPlayedGames, resetRecentlyAddedGames,
    resetSearchResults,
    setSearchResults
} from "../actions";
import {setGameSpecId, setMatchId} from "../../game_renderer/actions";
import {switchScreen} from "../../../shared/screen/actions";

const mapStateToProps = state => ({
    loading: state.screen.loading,
    gameSpecs: state.gameCenter.gameSpecs,
    recentlyAddedGames: state.gameCenter.recentlyAddedGames,
    previouslyPlayedGames: state.gameCenter.previouslyPlayedGames,
    searchResults: state.gameCenter.searchResults,
    matches: state.gameCenter.matches,
    groupId: state.chatRoom.groupId
});

const mapDispatchToProps = dispatch => ({
    addRecentlyAddedGame: recentlyAddedGame => dispatch(addRecentlyAddedGame(recentlyAddedGame)),
    addPreviouslyPlayedGame: previouslyPlayedGame => dispatch(addPreviouslyPlayedGame(previouslyPlayedGame)),
    setSearchResults: searchResults => dispatch(setSearchResults(searchResults)),
    setMatchId: matchId => dispatch(setMatchId(matchId)),
    setGameSpecId: gameSpecId => dispatch(setGameSpecId(gameSpecId)),
    switchScreen: newScreen => dispatch(switchScreen(newScreen)),
    resetRecentlyAddedGames: () => dispatch(resetRecentlyAddedGames()),
    resetPreviouslyPlayedGames: () => dispatch(resetPreviouslyPlayedGames()),
    resetSearchResults: () => dispatch(resetSearchResults())
});

export const NewMatchTabContainer = connect(mapStateToProps, mapDispatchToProps)(NewMatchTabComponent);