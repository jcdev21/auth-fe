export const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                token: action.token,
                user: action.user,
            };

        default:
            return state;
    }
};
