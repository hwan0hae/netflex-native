import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { IProgram, IGetProgramResult, getTvShow, IGetTvShow } from "../api";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { detailIdState, visibleState } from "../Components/atoms";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import TvDetail from "../Components/TvDetail";
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

type TvProps = NativeStackScreenProps<RootTabParamList, "Tv">;

export default function Tv({ navigation, route }: TvProps) {
  const scrollRef: any = useRef(null);
  const { data, isLoading } = useQuery<IGetTvShow>(["tvShow"], getTvShow);
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
            <Banner program={data?.popular_tv.results[0] as IProgram} />
            <Slider
              title="넷플릭스 인기 콘텐츠"
              data={data?.popular_tv as IGetProgramResult}
            />
            <Slider
              title="지금 뜨는 콘텐츠"
              data={data?.topRated_tv as IGetProgramResult}
            />
            <Slider
              title="지금 방영중인 콘텐츠"
              data={data?.onTheAir_tv as IGetProgramResult}
            />
            <ToTop>
              <TouchableOpacity onPress={toTop}>
                <AntDesign name="upcircle" size={36} color="white" />
              </TouchableOpacity>
            </ToTop>
          </ScrollView>
        )}
      </Container>
      {detailVisible ? <TvDetail programId={detailId as number} /> : null}
    </>
  );
}
