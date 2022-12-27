import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Fontisto } from "@expo/vector-icons";
import Home from "../Screens/Home";
import Tv from "../Screens/Tv";
import { RootStackParamList } from "./AppNavigator";
import { Image, TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Home: undefined;
  Tv: undefined;
};

type TabsProps = NativeStackScreenProps<RootStackParamList>;

export default function Tabs({ navigation }: TabsProps) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Image source={require("../assets/netflix_logo_icon.png")} />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Fontisto name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: "",
        headerTransparent: true,

        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          title: "시리즈",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="play-list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
