import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

        let firebaseConfig = {
            apiKey: "AIzaSyDzvIVbjQyLtmNfRSsVoKFE6siAvLJNll4",
            authDomain: "reactapp-68414.firebaseapp.com",
            databaseURL: "https://reactapp-68414.firebaseio.com",
            projectId: "reactapp-68414",
            storageBucket: "reactapp-68414.appspot.com",
            messagingSenderId: "288792218326",
            appId: "1:288792218326:web:b7a13bd46ee2aa07c49777",
            measurementId: "G-5F2BJTZH7X"
        };
        

class Firebase{
    constructor(){
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        this.app = app.database();
        //firebase.analytics();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password);
        const uid = app.auth().currentUser.uid;   

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInicialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

}

export default new Firebase();