export const registerUser = user => ({
    type: 'REGISTER_USER',
    payload: user
    
});

// ADMIN
export const getUser = uid => ({
    type: 'GET_USER',
    payload: uid
    
});

export const editUser = updates => ({
    type: 'EDIT_USER',
    payload: updates
    
});

export const deleteUser = id => ({
    type: 'DELETE_USER',
    payload: id
    
});
