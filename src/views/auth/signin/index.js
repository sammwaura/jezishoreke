import React, {useState, useEffect} from 'react';
import {useSelector, UseDispatch, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import useDidMount from 'hooks/useDidMount';
import {FORGOT_PASSWORD} from 'constants/routes';
import {
    signIn,
    signInWithGoogle
} from 'actions/authActions';
import Input from 'components/ui/Input';
import CircularProgress from 'components/ui/CircularProgress';


const SignIn = (props) =>{
    const {authStatus, isAuthenticating} = useSelector(state=>({
        authStatus: state.app.authStatus,
        isAuthenticating: state.app.isAuthenticating
    }))
    const [providerSelected, setProviderSelected] = useState(undefined);

    // we need to add two different states for signup and for forgot password
    const [signInStatus, setSignInStatus] = useState({});
    const [isSigningIn, setSigningIn] = useState(false);
    const [field, setField] = useState({});


    const dispatch = useDispatch();
    const didMount = useDidMount();


    useEffect(()=>{
        if(didMount){
            setSignInStatus(authStatus);
            setSigningIn(isAuthenticating);
        }
    }, [authStatus, isAuthenticating]);
    
    const onSubmitForm = () =>{
        e.preventDefault();
        const noError = Object.keys(field).every(key => !!field[key].value && !field[key].error)
        if(noError){
            dispatch(signIn(field.email.value, field.password.value));
            setProviderSelected('signin');
        }
    };

    const onEmailInput = (e, value, error) =>{
        setField({...field, email: {value, error}});

    };

    const onPasswordInput = (e, value, error) =>{
        setField({...field, password: {value, error}});

    };

    const onClickLink = ()=>{
        if(isSigningIn) e.preventDefault();
    };

    const onSignInWithGoogle = () =>{
        dispatch(signInWithGoogle());
        setProviderSelected('google');
    };

    const isSuccess = !!authStatus.success && authStatus.type === 'auth';

    return(
        <div className='signin-content'>
            {isSuccess && (
                <div className="loader">
                    <h3 className="toast-success signin-success">
                        {authStatus.message}
                        <CircularProgress/>
                    </h3>
                </div>
            )}
            {signInStatus.message && (
                <h5 className="text-center toast-error">
                    {authStatus.message}
                </h5>
            )}
            {isSuccess && (
                <>
                <div className={`signin ${signInStatus.message && (!authStatus.success && 'input-error')}` }></div>
                <div className="signin-main">
                    <h3> Sign In to JeziStore</h3>
                    <br/>
                    <div className="signin-wrapper">
                        <form onSubmit={onSubmitForm}>
                            <div className="signin-field">
                                <Input 
                                label="Email"
                                readOnly={isSigningIn}
                                placeholder="abc@gmail.com"
                                onInputChange={onEmailInput}
                                isRequired={true}
                                field="email"
                                type="email"
                                />
                            </div>

                            <div className="signin-field">
                                <Input 
                                label="Password"
                                readOnly={isSigningIn}
                                placeholder="Your Password"
                                onInputChange={onPasswordInput}
                                isRequired={true}
                                showError={true}
                                field="password"
                                type="password"
                                />
                            </div>
                    
                        <br/>
                            <div className="signin-field signin-action">
                                <Link
                                 onClick={onClickLink}
                                style={{textDecoration: 'underline'}}
                                to={FORGOT_PASSWORD}>
                                    <span>Forgot Password?</span>
                                </Link>
                                <button 
                                    className="button signin-button"
                                    disabled={isSigningIn}
                                    type="submit"
                                     >
                                     <CircularProgress
                                        theme="light"
                                        visible={isSigningIn && providerSelected === 'signin'}
                                        />     
                                        {isSigningIn && providerSelected === 'signin' ? 'signing In': 'Sign In'}

                                </button>
                            </div>
                        </form>
                        <button
                            className="button signin-provider-button provider-google"
                            disabled={isSigningIn}
                            onClick={onSignInWithGoogle}
                            >
                                {isSigningIn && providerSelected === 'google' ? (
                                    <CircularProgress theme='dark'/>    
                                ): (
                                    <i className="fab fa-google"/>

                                )}
                                <span>Sign In With Google</span>
                        </button>
                    </div>
                </div>
                </>
            )}
        </div>

    );
};
export default SignIn;