import { useLayoutEffect, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;
}

type HeaderTitleProps = {
  triggerPoint: number;
};

export function useAnimatedHeader({ triggerPoint }: HeaderTitleProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // title 치환시
  // useLayoutEffect(() => {
  //   if (title) {
  //     navigation.setOptions({
  //       title,
  //     });
  //   }
  // }, [navigation, title]);

  useEffect(() => {
    navigation.setOptions({});
  }, [navigation, scrollY]);

  return { scrollY };
}
