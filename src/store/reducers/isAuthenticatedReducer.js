import * as ACTION_TYPES from '../actions/action_type'
import { db } from '../../config/firebaseConfig'
const initialState = {
    isAuthenticated: false,
    name: null,
    email: null,
    photoURL: null,
    emailVerified: null,
    uid: null,
}

const isAuthenticatedReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ISAUTHENTICATED:
            let T_name, T_email, T_photoURL, T_uid, T_emailVerified;
            const user = action.payload

            if (user != null) {
                T_name = user.displayName.split(" ");
                T_email = user.email;
                T_photoURL = user.photoURL;
                T_emailVerified = user.emailVerified;
                T_uid = user.uid; 
                console.log('name :' + T_name + ' email :' + T_email + ' photoUrl :' + T_photoURL + ' email :' + T_emailVerified + ' uid :' + T_uid)
            }
            localStorage.clear()
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            if(!T_emailVerified){
                user.sendEmailVerification().then(function() {
                    console.log('// Email sent.')
                }).catch(function(error) {
                    console.log('// An error happened.')
                })
            }
            db.collection("user-profile")
            .doc(user.uid)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.exists) {
                    db.collection("user-profile").doc(user.uid).set({
                        active_plan: "Free",
                        email: T_email,
                        payment_last4digits: '',
                        telephone: '',
                    })
                }
            })
            return {
                ...state,
                isAuthenticated: true,
                name: T_name[0],
                email: T_email,
                photoURL: T_photoURL,
                emailVerified: T_emailVerified,
                uid: T_uid,
            }
        case ACTION_TYPES.ISLOGOUT:
            localStorage.clear()
            console.log('clear')
            return {
                ...state,
                isAuthenticated: false,
                name: null,
                email: null,
                photoURL: null,
                emailVerified: null,
                uid: null,
            }
        default:
            return state
    }
}

export default isAuthenticatedReducer