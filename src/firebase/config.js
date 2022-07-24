import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCiQrdVDH99gvCbjXOj5OuIArkTXLv1vwQ',
  authDomain: 'miniblogproject-32e8e.firebaseapp.com',
  projectId: 'miniblogproject-32e8e',
  storageBucket: 'miniblogproject-32e8e.appspot.com',
  messagingSenderId: '833589607983',
  appId: '1:833589607983:web:a7e731c284a91a5fc7d0da'
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
