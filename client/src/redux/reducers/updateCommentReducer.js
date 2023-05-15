import { GLOBALTYPES } from '../actions/globalTypes'


const updateCommentReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.COMMENT:
            return action.payload;
        default:
            return state;
    }
}


export default updateCommentReducer;