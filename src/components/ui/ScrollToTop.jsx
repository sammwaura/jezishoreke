import React, {Component, userEffect} from 'react';
import { withRouter } from 'react-router-dom';
const ScrollToTop = Component=> withRouter((props)=>{
    userEffect(()=>{
        window.scrollTo(0, 0);
    }, [props.location])
    return <Component {...props}/>
}) 

export default ScrollToTop; 