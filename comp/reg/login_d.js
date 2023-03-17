

import getApp from "../util/firebaseConfig";
import {Text, View} from "react-native";
import { getAuth, signInWithPhoneNumber ,RecaptchaVerifier} from "firebase/auth";
import React, {Component} from "react";




class Login_d extends Component {

     signIn = (email,password) =>{
        const auth = getAuth(getApp());
       // const auth = getAuth();
        auth.languageCode = 'iq';
        const phoneNumber = "+964 9990564977";
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                signInWithCode();
                // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
        });
    }




     signInWithCode = () => {
        const code = "123321";
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            //grecaptcha.reset(window.recaptchaWidgetId);
        });
    }



    render() {
        return (
            <Text>Hello, this is login!</Text>
        );
    }
}


export default Login_d;
