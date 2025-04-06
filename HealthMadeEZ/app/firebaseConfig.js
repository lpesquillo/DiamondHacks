// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: 'AIzaSyAx7qCeMTmb06N1vj02Pe5GoCieHerajBo',
    authDomain: 'health-made-ez.firebaseapp.com',
    projectId: 'health-made-ez',
    storageBucket: 'health-made-ez.appspot.com',
    messagingSenderId: '390636451355',
    appId: '1:390636451355:ios:473af6d958f738ef4daabe',
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth };
  export default app;
  