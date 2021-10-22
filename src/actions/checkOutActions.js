export const setShippingDetails = details => ({
    type: 'SET_CHECKOUT_SHIPPING_DETAILS',
    payload: details
    
});

export const setPaymentDetails = details => ({
    type: 'SET_CHECKOUT_PAYMENT_DETAILS',
    payload: details
    
});

export const resetCheckOut = () => ({
    type: 'RESET_CHECKOUT',   
});