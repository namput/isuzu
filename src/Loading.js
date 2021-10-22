import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {StackActions} from '@react-navigation/native';

export default function Loading() {
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
      try {
        await AsyncStorage.setItem("language", "TH");
        let userToken = await AsyncStorage.getItem("token");
        if (userToken != null) {
          navigation.dispatch(StackActions.replace("Main"));
        } else {
          navigation.dispatch(StackActions.replace("LoginScreen"));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="#DC143C" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
