import React from 'react';
import {render} from 'react-dom';
import App from './App';
import 'normalize.css/normalize.css';
import 'react-phone-input-2/lib/style.css';
import WebFont from 'webfontloader';
import firebase from './firebase/firebase';
import {onAuthStateSuccess, onAuthStateFail} from 'actions/authActions';
import configureStore from 'store/store';
import PreLoader from 'components/ui/PreLoader';
import 'styles/styles.scss';

WebFont.load({
  google:{
    families: ['Droid Sans']
  }
});

const { store, persistor} = configureStore();
const root = document.getElementById('app')
render(<PreLoader/>, root);
firebase.auth.onAuthStateChanged((user)=>{
  if(user){
    store.dispatch(onAuthStateSuccess(user));
  }else{
    store.dispatch(onAuthStateFail('Failed to Authenticate'));
  }
  render(<App store={store} persistor={persistor}/>, root);
});


if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then.apply((registration)=>{
      console.log('SW registered:', registration);
    }).catch((registrationError)=>{
      console.log('SW registration failed:', registrationError);
  })
})
}
