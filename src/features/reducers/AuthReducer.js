export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.token,
                user: action.user,
            };

        default:
            return state;
    }
};
