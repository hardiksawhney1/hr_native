import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import React, { useState } from 'react';

//ios
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from 'firebase/auth';
import { firebaseAuth } from '@/backend/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Loginpage from './Loginpage';
WebBrowser.maybeCompleteAuthSession();
export const index = () => {
  const [error, setError] = React.useState();
  const [userInfo, setUserInfo] = React.useState<any>();
    const [loading, setLoading] = React.useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
      iosClientId:"479751315674-971pc62agshf6obhc2mj3mp4itrg71o7.apps.googleusercontent.com"
    })
    const checkLocalUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem("@user");
        const userData = userJSON ? JSON.parse(userJSON) : null;
        setUserInfo(userData);
      } catch (error:any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    React.useEffect(() => {
      checkLocalUser();
    
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          console.log(JSON.stringify(user, null, 2));
          setUserInfo(user);
        } else {
          console.log("No user signed in.");
          setUserInfo(null); // Ensure userInfo is cleared if no user is signed in
        }
        setLoading(false);
      });
    
      return unsubscribe; // Clean up subscription on unmount
    }, []);
    
    React.useEffect(() => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(firebaseAuth, credential)
          .then(() => {
            console.log("User signed in successfully!");
          })
          .catch((error) => {
            console.error("Error signing in with Google:", error);
          });
      }
    }, [response]);
    const handleSignOut = () => {
      signOut(firebaseAuth)
        .then(() => {
          console.log("User signed out successfully!");
          setUserInfo(null); // Clear user info on signout
        })
        .catch((error:any) => {
          console.error("Error signing out:", error);
        });
    };
    if (loading) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
    
    if (userInfo) {
      return (
        <View style={{ flex: 1 }}>
          {/* <Text>Hello, {userInfo.displayName}</Text>
          <Button title="Sign Out" onPress={handleSignOut} /> */}
          <Redirect href="(tabs)"/>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar style="light" />
          <Loginpage promptAsync={promptAsync} />
        </View>
      );
    }
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      text: {
        fontSize: 24,
        marginBottom: 20,
      },
      button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: "#fff",
        fontSize: 18,
      },
})