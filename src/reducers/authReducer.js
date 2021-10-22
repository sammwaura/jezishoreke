const initState = {};
export default (state = initState, action) => {
    switch (action.type) {
        case 'SIGN_SUCCESS':
            return {
                loading: action.payload
            };

            case 'IS_AUTHENTICATING':
            return {
                isAUthenticating: action.payload
            };
    
            case 'SET_REQUEST_STATUS':
                return {
                    requestStatus: action.payload
                };
        
            case 'SET_AUTH_STATUS':
                 return {
                        authStatus: action.payload
                };
        default:
            return state;
    }
}