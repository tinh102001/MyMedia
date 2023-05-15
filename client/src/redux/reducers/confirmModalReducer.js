import { GLOBALTYPES } from '../actions/globalTypes'


const confirmModalReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.CONFIRM:
            return action.payload;
        default:
            return state;
    }
}


export default confirmModalReducer