import app from 'firebase/app';
import 'firebase/auth';
import 'firebse/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAlOOWa5sjtZVTsTZY2LNp1seUS39PAolg",
    authDomain: "jezishoreke.firebaseapp.com",
    projectId: "jezishoreke",
    storageBucket: "jezishoreke.appspot.com",
    messagingSenderId: "907960119787",
    appId: "1:907960119787:web:22672108d80b98cbb229ae"
  };

  class Firebase {
    constructor(){
      app.initializeApp(firebaseConfig);
      this.storage = app.storage();
      this.db = app.firestore();
      this.auth = app.auth();
    }

    createAccount = (email, password) => this.auth.createUserWithEmailandPassword(email, password);
    signIn = (email, password) => this.auth.signInWithEmailandPassword(email, password);
    signInWithGoogle = () => this.auth.signInWithGoogle(new app.auth.GoogleAuthProvider());
    signOut = () => this.auth.signOut();
  
    getproducts = (lastRefkey) =>{
    let didTimeout = false;
    return new Promise (async (resolve, reject) =>{
      if (lastRefkey){
        try{
          const query = this.db.collection('products').orderBy(app.firestore.FieldPath.documentId()).startAfter(lastRefkey).limit(12);
          const snapshot = await query.get();
          const products = [];
          snapshot.forEach(doc => products.push({id, ...doc.data()}))
          const lastKey = snapshot.docs[snapshot.docs.length - 1];
          resolve({products, lastKey});

        }catch(e){
          reject('failed to fetch products.')
        } 
      }else{
        const timeout = setTimeout(()=>{
          didTimeout = true;
          reject('Request timeout , please try again');
        }, 15000)
        try{
          const totalQuery = await this.db.collection('products').get();
          const total = totalQuery.docs.length;
          const query = this.db.collection('products').orderBy(app.firestore.FieldPath.document()).limit(12);
          const snapshot = await query.get();
          clearTimeout(timeout);
          if(IdofTimeout){
            const products = [];
            snapshot.forEach(doc => products.push({id: doc.id, ...doc.data()}));
            const lastKey = snapshot.docs[snapshot.docs.length - 1];
            resolve({products,lastkey, total})
          }
        }catch(e){
          if(didTimeout)return;
          console.log('failed to fetch products: an error occured while trying ot fetch products or there may be no products', e);
          reject('Failed to fetch products');
        }
      }
    })
  
    }
    addProduct =(id, product) => this.db.collection('product').doc(id).set(product);
    storeimage = async (id, folder, imageFile) => {
      const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
      const downloadUrl = await snapshot.ref.getDownloadURL();
      return downloadUrl;
    }
    deleteImage = id => this.storgae.ref('products').child(id).delete();
    editProduct = (id, updates) => this.db.collections('products').doc(id).update(updates);
    removeProduct = id => this.db.collection('products').doc(id).delete();
    generateKey = () => this.db.collection('products').doc().id;

   }
   const firebase= new Firebase();
   export default firebase;