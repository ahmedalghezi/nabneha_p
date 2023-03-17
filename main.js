import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//import Ionicons from '@expo/vector-icons/Ionicons';
//import {MaterialCommunityIcons} from '@expo/vector-icons';
//import {Entypo} from '@expo/vector-icons';

import {useEffect, useState} from 'react';
//import ExampleThree from "./comp/account/test";

import ProductListAll from './comp/company/ProductNavi';
import TempPoll from './comp/company/poll/tempPoll';
import RegistrationForm, {isProductRegistered} from './comp/company/register';
import profile from './comp/company/profile';
import ProfilePage from './comp/company/profile';
import AllProductDetails from './comp/company/allProductDetails';
import RegistrationOrProfile from './comp/company/register';
import getApp from './comp/util/firebaseConfig';
import {getAuth} from 'firebase/auth';
import Stock from './comp/company/Stock';
import ShowProfile from './comp/company/ProfileCard';
import Home from './comp/company/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
//import Ionicons from 'react-native-vector-icons/Ionicons';

// (...)
const Tab = createBottomTabNavigator();
const {getSavedPersonalCode} = require('./comp/reg/register');

import auth, { firebase } from "@react-native-firebase/auth";
export default function TabNav() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isMahal, setIsMahal] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [showMahalList, setShowMahalList] = useState(true);
  const [started, setStarted] = useState(false);
  const [transferCount, setTrasferCount] = useState(0);
  //const navigation = useNavigation();

  useEffect(() => {
    if (!started) {
      checkIfRegistered();
    }

    anonymousSignIn();
    return;
    //const user = auth().currentUser;
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
        alert("success");
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });

    //const app = getApp();
    //const auth = getAuth(app);
  });

  const checkIfRegistered = async () => {
    const code = await isProductRegistered(); //await getSavedPersonalCode();
    if (code) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
  };




  const anonymousSignIn = async () => {
    try {
      const userCredential = await firebase.auth().signInAnonymously();
      const userId = userCredential.user.uid;
    //  alert( userId);
      requestUserPermission();
    } catch (error) {
      console.error(error);
      return null;
    }
  };



  const requestUserPermission = async () => {
    const settings = await messaging().requestPermission();
    if (settings) {
      console.log('Permission granted!');
      messaging().onMessage(async remoteMessage => {
        console.log('Received a new notification', remoteMessage);
      });
    }
  };



  const onRegister = () => {
    setIsRegistered(true);
  };

  const onTransfer = () => {
    setTrasferCount(transferCount + 1);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';
            let iconColor = 'red';
            iconColor = focused ? 'red' : 'black';

            if (route.name === 'حول') {
              iconName = 'bank-transfer';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={24}
                  color={iconColor}
                />
              );
            }

            if (route.name === 'مشاريع') {
              iconName = 'city';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={24}
                  color={iconColor}
                />
              );
            } else if (route.name === 'اسحب') {
              iconName = 'receipt';
              return (
                <FontAwesome5 name={iconName} size={24} color={iconColor} />
              );
            } else if (route.name === 'السجل') {
              iconName = 'list-ol';
              return (
                <FontAwesome5 name={iconName} size={24} color={iconColor} />
              );
            } else if (route.name === 'الرئيسة') {
              iconName = 'home';
              return <Entypo name={iconName} size={24} color={iconColor} />;
            } else if (route.name === 'التسجيل') {
              iconName = 'info-with-circle';
              return <Entypo name={iconName} size={24} color={iconColor} />;
            } else if (route.name === 'المراكز') {
              iconName = 'store-alt';
              return (
                <FontAwesome5 name={iconName} size={24} color={iconColor} />
              );
            } else if (route.name === 'ملفي') {
              iconName = 'person';
              return <Ionicons name={iconName} size={24} color={iconColor} />;
            }

            return <FontAwesome5 name={iconName} size={24} color="black" />;
            // You can return any component that you like here!
            //<Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        {<Tab.Screen name="الرئيسة" component={Home} />}

        {<Tab.Screen name="مشاريع" component={ProductListAll} />}

        {/*<Tab.Screen name="نقاش" component={Stock} />*/}

        {/*<Tab.Screen name="اسهم" component={Stock} />*/}
        {/*<Tab.Screen name="تصويت" component={TempPoll} />*/}
        {/*<Tab.Screen name="مجلس الادارة" component={CompanyBoard} />*/}
        {/*<Tab.Screen name="تسجيل عضو" component={RegistrationForm} />*/}
        {!isRegistered && (
          <Tab.Screen name="التسجيل" component={RegistrationOrProfile} />
        )}
        {isRegistered && <Tab.Screen name="ملفي" component={ProfilePage} />}

        {/*<Tab.Screen name="تفاصيل" component={ProductDetails} />*/}

        {/*
                {isRegistered&&isUser&&<Tab.Screen name="الرئيسة">
                    {() => <User transferCount={transferCount}/>}</Tab.Screen>}

                {isRegistered&&<Tab.Screen name="حول">
                    {() => <TransferFunc onTransferDone={onTransfer}/>}
                </Tab.Screen>}
                {isRegistered&&isMahal&&<Tab.Screen name="اسحب" component={Recieve} />}
                {isRegistered&&<Tab.Screen name="السجل" component={Transactions} />}

                {isRegistered&&isAgent&&<Tab.Screen name="تسجيل محل" component={StoreInfo} />}
                {isRegistered&&showMahalList&&<Tab.Screen name="المراكز" component={StoreMap} />}
                */}

        {/*!isRegistered && (
          <Tab.Screen name="التسجيل2">
            {() => <Register onRegister={onRegister} />}
          </Tab.Screen>
        )*/}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
