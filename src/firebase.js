import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

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

        //Referenciando o database em outros locais
        this.app = app.database();
        this.storage = app.storage();
        //firebase.analytics();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout(){
        return app.auth().signOut();
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

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
            if(!app.auth().currentUser){
                return null;
            }

            const uid = app.auth().currentUser.uid;
            await app.database().ref('usuarios').child(uid)
            .once('value')
            .then(callback);
    }

}

export default new Firebase();