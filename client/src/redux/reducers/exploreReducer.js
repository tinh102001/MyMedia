import { EXPLORE_TYPES } from "../actions/exploreActions";

const initialState = {
  loading: false,
  posts: [],
  result: 9,
  page: 2,
  firstLoad: false,
};

const exploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPLORE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case EXPLORE_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        firstLoad: true,
      };
    case EXPLORE_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export default exploreReducer;
