import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCg9Gplh3Kmz-FOFvEMjolzOkPCRbQqEFU",
    authDomain: "monakaonline.firebaseapp.com",
    databaseURL: "https://monakaonline.firebaseio.com",
    projectId: "monakaonline",
    storageBucket: "monakaonline.appspot.com",
    messagingSenderId: "909984728158",
    appId: "1:909984728158:web:9ded2964efaf1029d020cf"
}
var fire = firebase.initializeApp(config)
const db = fire.firestore()
const storage = fire.storage()
export default fire
export { db,storage }