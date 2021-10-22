export const getProducts = lastRef => ({
    type: 'GET_PRODUCTS',
    payload: lastRef
    
});

export const getProductSuccess = products => ({
    type: 'GET_PRODUCT_SUCCESS',
    payload: products
    
});

export const cancelGetProducts = () => ({
    type: 'CANCEL_GET_PRODUCTS',    
});

export const addProducts = product => ({
    type: 'ADD_PRODUCT',
    payload: product
    
});

export const addProductSuccess = product => ({
    type: 'ADD_PRODUCT_SUCCESS',
    payload: product
    
});

export const removeProduct = id => ({
    type: 'REMOVE_PRODUCT',
    payload: id
    
});

export const removeProductSuccess = id => ({
    type: 'REMOVE_PRODUCT_SUCCESS',
    payload: id
    
});

export const editProduct = (id, update) => ({
    type: 'APPLY_FILTER',
    payload: {
        id,
        update
    }
});

export const editProductSuccess = updates => ({
    type: 'EDIT_PRODUCT_SUCCESS',
    payload: updates
    
});

