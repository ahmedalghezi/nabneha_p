import React from 'react';
import Constants from 'expo-constants';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import TextInput from '../util/textInput';

import {Form, Field, Submit} from 'react-swift-form';
import * as yup from 'yup';
import Post from "../../DB/post";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber,createUserWithEmailAndPassword} from "firebase/auth";
import getApp from "../util/firebaseConfig";
import WebView from "react-native-webview";



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const initialValues = {
    name: '',
    phone: '',
};
const validators = {
    name: yup.string().required("Name is required").min(3, "يرجى كتابة الاسم الكامل"),
    phone: yup.string().required("رقم الموبايل مطلوب").matches(phoneRegExp, 'رقم الموبايل لا يبدو صحيحاً'),
}


function onSignInSubmit() {

}

export default function Register_d() {
    const onFormSubmit = (values) => {
        //register with firebase
        console.log("signing in ");
       // signIn();
        checkBot();
        //alert(JSON.stringify(values, null, 2));
    }

    function checkBot() {
        console.log("signing in with firebase");
        const auth = getAuth();
         window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        /*window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        }, auth);*/




        window.recaptchaVerifier = new RecaptchaVerifier('contai', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
                console.log("done");
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        }, auth);
    }


    function signIn(){
        console.log("signing in with firebase");
        const auth = getAuth(getApp());
        // const auth = getAuth();
        auth.languageCode = 'iq';
        const phoneNumber = "+964 9990564977";
        window.recaptchaVerifier = new RecaptchaVerifier('contai', {}, auth);
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("code send");
                signInWithCode();
                // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("Error; SMS not sent");
            console.log("kkk"+error);
        });
    }




    function signInWithCode ()  {
        const code = "123321";
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            alert("تم التسجيل")
            // ...
        }).catch((error) => {
            alert("خطأ في الكود")
            // User couldn't sign in (bad verification code?)
            // ...
            //grecaptcha.reset(window.recaptchaWidgetId);
        });
    }




    function registerServer(){
        Post.register(values).then(response => {
            if(response.data.res === "error") {
                alert("error code surve151");
                return;
            }
            if(response.data.res === "no"){
                alert("Bitte erst anmelden.");
                return;
            }
            if(response.data.res === "ok") {
                alert("تم التسجيل بنجاح")
            }

        }).catch(e => {
            console.log(e);
            alert("Es ist ein Fehler aufgetreten!");
        });
    }




    return (
        <View style={styles.container}>

            <Card style={styles.card}>

                <Form initialState={initialValues} validator={validators}>
                    <Field id="name">
                        {({value, error, changeValue}) => (
                            <TextInput value={value} error={error} onChangeText={changeValue} placeholder="الاسم" label="الاسم الكامل" />
                        )}
                    </Field>

                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: 'http://localhost:3000/' }}
                    />

                    <Field id="phone">
                        {({value, error, changeValue}) => (
                            <TextInput value={value} error={error} onChangeText={changeValue} placeholder="الموبايل" label="رقم الموبايل" />
                        )}
                    </Field>

                    <View id={"contai"}></View>
                    <Submit onSubmit={onFormSubmit}>
                        {({submit}) => (
                            <Button id="sign-in-button" title="سجل" onPress={submit} />
                        )}
                    </Submit>
                </Form>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 24,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    card: {
        padding: 12,
    }
});



