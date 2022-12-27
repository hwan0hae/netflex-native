import { ActivityIndicator, Dimensions, Modal, Text, View } from "react-native";
import { useSetRecoilState } from "recoil";
import { visibleState } from "./atoms";
import styled from "styled-components/native";
import { makeImagePath } from "../utills";
import { useQuery } from "react-query";
import { getTv, IgetTv } from "../api";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Loader,
  CoverView,
  Cover,
  CoverPosterImg,
  InfoView,
  InfoTitle,
  InfoTagline,
  InfoGenres,
  InfoOverView,
  SimilarView,
  SimilarTitle,
  SimilarMoviesView as SimilarTvShowView,
  SimilarMovie as SimilarTv,
  SimilarMovieImg as SimilarTvImg,
  SimilarMovieTitle as SimilarTvTitle,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "./Detail";

interface Detailprops {
  programId: number;
}

export default function TvDetail({ programId }: Detailprops) {
  const setDetailVisible = useSetRecoilState(visibleState);
  const { data, isLoading } = useQuery<IgetTv>(["tv"], () => getTv(programId));

  return (
    <Modal
      visible={true}
      transparent={false}
      animationType={"slide"}
      presentationStyle={"pageSheet"}
      onRequestClose={() => setDetailVisible(false)}
    >
      {isLoading ? (
        <Loader>
          <ActivityIndicator color="red" size="large" />
        </Loader>
      ) : (
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,1)" }}>
          <CoverView>
            <Cover
              style={{
                width: SCREEN_WIDTH,
              }}
              source={{
                uri: makeImagePath(data?.tv_detail.backdrop_path + ""),
              }}
            >
              <View>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    style={{
                      margin: 10,
                      backgroundColor: "#2e313d",
                      borderRadius: 20,
                      padding: 3,
                    }}
                    onPress={() => setDetailVisible(false)}
                  >
                    <Feather name="x" size={30} color="white" style={{}} />
                  </TouchableOpacity>
                </View>
                <CoverPosterImg
                  style={{
                    height: SCREEN_HEIGHT * 0.122,
                    top: 100,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: makeImagePath(data?.tv_detail.poster_path + ""),
                  }}
                />
              </View>
            </Cover>
          </CoverView>
          <InfoView>
            <InfoTitle>{data?.tv_detail.name}</InfoTitle>
            <InfoTagline>{data?.tv_detail.tagline}</InfoTagline>
            <InfoGenres>
              장르:{" "}
              {data?.tv_detail.genres.map((i) => (
                <View key={i.id}>
                  <Text style={{ color: "white" }}>{i.name} </Text>
                </View>
              ))}
            </InfoGenres>
            <InfoOverView>{data?.tv_detail.overview}</InfoOverView>
            <SimilarView>
              <SimilarTitle>
                비슷한 시리즈: 총 {data?.similar_tvShow.results.length}편{" "}
              </SimilarTitle>
              <SimilarTvShowView>
                {data?.similar_tvShow.results.map((tv) => (
                  <SimilarTv key={tv.id}>
                    <SimilarTvImg
                      style={{ width: SCREEN_WIDTH * 0.4 }}
                      resizeMode="contain"
                      source={{
                        uri: makeImagePath(tv.backdrop_path),
                      }}
                    />
                    <SimilarTvTitle>{tv.name}</SimilarTvTitle>
                  </SimilarTv>
                ))}
              </SimilarTvShowView>
            </SimilarView>
          </InfoView>
        </View>
      )}
    </Modal>
  );
}
