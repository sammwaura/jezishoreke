import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Basket from 'componets/basket/Basket';
import Navigation from 'component/ui/Navigation';
import Footer from 'components/ui/Footer';
const PrivateRoute = ({isAuth, userType, component: Component, path, ...rest})=>(
    <Route 
    {...rest}
    component={props =>(
        isAuth && userType === 'USER'
        ?(<> 
        <Navigation path={path} isAuth={isAuth}></Navigation>
        <Basket isAuth={isAuth}></Basket>
        <main className='content'>
            <Component {...props}></Component>
            <Footer path={path}></Footer>
        </main>
        </>):isAuth && userType === 'ADMIN' ? <Redirect to={'/admin/dashboard'}/>
        :<Redirect to = {{
            pathname:'/signin',
            state:{from: props.location}
        }}
        />
    )}
    ></Route>
);
const mapStateToProps = ({auth}) => ({
    isAuth: !!auth.id && !!auth.role,
    userType: auth.role
});
export default connect(mapStateToProps)(PrivateRoute);