const initState = {
    loading: false,
    Authenticating: false,
    authStatus: {},
    requestStatus: null,
    theme: 'default'
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            };

            case 'IS_AUTHENTICATING':
            return {
                ...state,
                isAUthenticating: action.payload
            };
    
            case 'SET_REQUEST_STATUS':
                return {
                    ...state,
                    requestStatus: action.payload
                };
        
            case 'SET_AUTH_STATUS':
                 return {
                        ...state,
                        authStatus: action.payload
                };
        default:
            return state;
    }
}