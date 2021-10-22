export const setProfile = user => ({
    type: 'SET_PROFILE',
    payload: user
    
});

export const clearProfile = () => ({
    type: 'CLEAR_PROFILE',    
});

export const updateEmail = (passsword, newEmail) => ({
    type: 'APPLY_FILTER',
    payload: {
        passsword,
        newEmail
    }
    
});
export const updateProfile = newProfile => ({
    type: 'UPDATE_PROFILE',
    payload: {
        updates: newProfile.updates,
        files: newProfile.files,
        credentials: newProfile.credentials
    }
    
});

export const updateProfileSuccess = updates => ({
    type: 'UPDATE_PROFILE_SUCCESS',
    payload: updates
    
});