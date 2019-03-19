export default function getShopcartCount(state={count: 0}, action){
    switch(action.type){
        case 'CHANGE_SHOPCART_COUNT':
            return {
                ...state,
                count: action.count
            }
            default:
            return state;
    }
}