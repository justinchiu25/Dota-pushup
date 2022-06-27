import { createStore, combineReducers, applyMiddleware } from "redux";
//import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./Redux/User";
import authReducer from "./Redux/Auth";
import leaderboardReducer from "./Redux/Leaderboard";

const reducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  leaderboard: leaderboardReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);
//createLogger({ collapsed: true })
const store = createStore(reducer, middleware);

export default store;