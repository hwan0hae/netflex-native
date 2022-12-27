import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { getMovies, IGetMovies, IProgram, IGetProgramResult } from "../api";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useRef } from "react";
import Detail from "../Components/Detail";
import { useRecoilValue } from "recoil";
import { detailIdState, visibleState } from "../Components/atoms";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import { RootTabParamList } from "../Navigation/Tabs";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ToTop = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

type HomeProps = NativeStackScreenProps<RootTabParamList, "Home">;

export default function Home({ navigation, route }: HomeProps) {
  const scrollRef: any = useRef(null);
  const { data, isLoading } = useQuery<IGetMovies>(["movies"], getMovies);
  const detailVisible = useRecoilValue(visibleState);
  const detailId = useRecoilValue(detailIdState);
  const toTop = () => {
    scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <Loader>
            <ActivityIndicator color="red" size="large" />
          </Loader>
        ) : (
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{}}
            scrollEventThrottle={16}
          >
            <Banner program={data?.playing_movie.results[0] as IProgram} />
            <Slider
              title="현재 상영중인 영화"
              data={data?.playing_movie as IGetProgramResult}
            />
            <Slider
              title="현재 인기있는 영화"
              data={data?.popular_movie as IGetProgramResult}
            />
            <Slider
              title="평가가 좋은 영화"
              data={data?.topRated_movie as IGetProgramResult}
            />
            <Slider
              title="개봉 예정 영화"
              data={data?.upComing_movie as IGetProgramResult}
            />
            <ToTop>
              <TouchableOpacity onPress={toTop}>
                <AntDesign name="upcircle" size={36} color="white" />
              </TouchableOpacity>
            </ToTop>
          </ScrollView>
        )}
      </Container>
      {detailVisible ? <Detail programId={detailId as number} /> : null}
    </>
  );
}
