import { ActivityIndicator, Dimensions, Modal, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { visibleState } from "./atoms";
import styled from "styled-components/native";
import { makeImagePath } from "../utills";
import { useQuery } from "react-query";
import { getMovie, IGetMovie } from "../api";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
export const CoverView = styled.View``;
export const Cover = styled.ImageBackground`
  height: 240px;
  flex-direction: row;
  justify-content: flex-end;
`;
export const CoverPosterImg = styled.Image`
  width: 75px;
  margin: 10px;
  border-radius: 10px;
`;

export const InfoView = styled.ScrollView`
  margin: 10px;
`;

export const InfoTitle = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 3px;
`;
export const InfoTagline = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 3px;
`;
export const InfoGenres = styled.Text`
  color: white;
  font-weight: 300;
  font-size: 14px;
  margin-bottom: 3px;
`;
export const InfoTime = styled.Text`
  color: white;
  font-weight: 300;
  font-size: 14px;
  margin-bottom: 3px;
`;
export const InfoOverView = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 16px;
  margin: 3px 0;
`;
export const SimilarView = styled.View``;
export const SimilarTitle = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
  margin: 3px 0;
`;
export const SimilarMoviesView = styled.View``;
export const SimilarMovie = styled.TouchableOpacity`
  margin: 1px 0px;
  flex-direction: row;
`;
export const SimilarMovieImg = styled.Image`
  height: 100px;
  border-radius: 10px;
`;
export const SimilarMovieTitle = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
  margin: 5px;
`;
interface Detailprops {
  programId: number;
}

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export default function Detail({ programId }: Detailprops) {
  const [detailVisible, setDetailVisible] = useRecoilState(visibleState);
  const { data, isLoading } = useQuery<IGetMovie>(["movie"], () =>
    getMovie(programId)
  );

  return (
    <Modal
      visible={detailVisible}
      transparent={false}
      animationType={"slide"}
      presentationStyle={"formSheet"}
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
                uri: makeImagePath(data?.movie_detail.backdrop_path + ""),
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
                    uri: makeImagePath(data?.movie_detail.poster_path + ""),
                  }}
                />
              </View>
            </Cover>
          </CoverView>
          <InfoView>
            <InfoTitle>{data?.movie_detail.title}</InfoTitle>
            <InfoTagline>{data?.movie_detail.tagline}</InfoTagline>
            <InfoGenres>
              장르:{" "}
              {data?.movie_detail.genres.map((i) => (
                <View key={i.id}>
                  <Text style={{ color: "white" }}>{i.name} </Text>
                </View>
              ))}
            </InfoGenres>
            <InfoTime>
              개봉일: {data?.movie_detail.release_date}
              {"\n"}
              상영시간: {data?.movie_detail.runtime}분
            </InfoTime>
            <InfoOverView>{data?.movie_detail.overview}</InfoOverView>
            <SimilarView>
              <SimilarTitle>
                비슷한 영화: 총 {data?.similar_movies.results.length}편{" "}
              </SimilarTitle>
              <SimilarMoviesView>
                {data?.similar_movies.results.map((movie) => (
                  <SimilarMovie key={movie.id}>
                    <SimilarMovieImg
                      style={{ width: SCREEN_WIDTH * 0.4 }}
                      resizeMode="contain"
                      source={{
                        uri: makeImagePath(movie.backdrop_path),
                      }}
                    />
                    <SimilarMovieTitle>{movie.title}</SimilarMovieTitle>
                  </SimilarMovie>
                ))}
              </SimilarMoviesView>
            </SimilarView>
          </InfoView>
        </View>
      )}
    </Modal>
  );
}
