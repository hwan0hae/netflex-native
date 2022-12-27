import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../Screens/Search";
import Tabs, { RootTabParamList } from "./Tabs";
import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export type RootStackParamList = {
  Main: RootTabParamList;
  Search?: { text: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function () {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            animation: "default",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 넷플버튼 누르면 홈으로 , 돋보기누르면 Search페이지 이동
