const initState = {
    recent:[],
    keyword: '',
    minPrice: 0,
    maxPrice: 0,
    sortBy: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                recent: (!!state.recent.find(n => n === action.payload) || action.payload === '') ? state.recent : [ action.payload, ...state.recent],
                keyword: action.payload

            };
        case 'SET_BRAND_FILTER':
            return {
                ...state,
                brand: action.payload
    
                };

        case 'SET_MAX_PRICE_FILTER':
            return {
                ...state,
                maxPrice: action.payload
        
            };

        case 'SET_MIN_PRICE_FILTER':
            return {
                ...state,
                minPrice: action.payload
            
            };

        case 'RESET_FILTER':
            return initState;

        case 'CLEAR_RECENT_FILTER':
            return {
                ...state,
                recent: []                
            };
        case 'REMOVE_SELECTED_RECENT':
            return {
                ...state,
                recent: state.recent.filter(item => item !== action.payload)                
            };

        case 'APPLY_FILTER':
            return {
                ...state,
                ...action.payload
            };
        default:
            break;
    }
}