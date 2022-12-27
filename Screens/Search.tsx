import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/AppNavigator";
import styled from "styled-components/native";
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { getMovies, getSearchData, IGetMovies, IGetSearchData } from "../api";
import Detail, { SCREEN_WIDTH } from "../Components/Detail";
import TvDetail from "../Components/TvDetail";
import { makeImagePath } from "../utills";
import { Fontisto } from "@expo/vector-icons";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { detailIdState, visibleState } from "../Components/atoms";

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const Back = styled.TouchableHighlight`
  margin: 0 20px;
`;
const SearchBar = styled.View`
  background-color: #2e313d;
  padding: 8px;
  flex-direction: row;
  border-radius: 5px;
`;

const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SearchText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 500;
  margin: 10px 0;
`;

const Movie = styled.TouchableOpacity`
  margin: 1px 0px;
  flex-direction: row;
  align-items: center;
`;
const MovieImg = styled.Image`
  height: 100px;
  border-radius: 10px;
`;
const MovieNullImg = styled.View`
  height: 100px;
  border-radius: 10px;
  background-color: #2e313d;
  align-items: center;
  justify-content: center;
`;
const MovieTitle = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
  margin: 5px;
`;

type SearchProps = NativeStackScreenProps<RootStackParamList, "Search">;

export default function Search({ navigation, route }: SearchProps) {
  const [text, setText] = useState<string>("");
  const [detailVisible, setDetailVisible] = useRecoilState(visibleState);
  const [detailId, setDetailId] = useRecoilState(detailIdState);
  const [type, setType] = useState("");
  const movies = useQuery<IGetMovies>(["movies"], getMovies);
  const keyword = useQuery<IGetSearchData>(["search", text], () =>
    getSearchData(text)
  );
  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text);
  };
  const onPressDetail = (id: number, type: string) => {
    setDetailId(id);
    setType(type);
    setDetailVisible(true);
  };
  return (
    <>
      <Container>
        <SafeAreaView>
          <Header>
            <Back onPress={() => navigation.pop()}>
              <Fontisto name="angle-left" size={16} color="white" />
            </Back>
            <SearchBar>
              <Fontisto
                name="search"
                size={24}
                color="gray"
                style={{ marginHorizontal: 5 }}
              />
              <TextInput
                style={{
                  color: "white",
                  fontSize: 16,
                  marginHorizontal: 5,
                  width: SCREEN_WIDTH * 0.7,
                }}
                value={text}
                onChange={onChange}
                placeholder="검색"
                placeholderTextColor={"gray"}
              />
            </SearchBar>
          </Header>
          {movies.isLoading ? (
            <Loader>
              <ActivityIndicator color="red" size="large" />
            </Loader>
          ) : text == "" ? (
            <ScrollView>
              <SearchText>현재 인기 있는 영화</SearchText>
              <View>
                {movies.data?.popular_movie.results.map((movie) => (
                  <Movie
                    key={movie.id}
                    onPress={() => onPressDetail(movie.id, "movie")}
                  >
                    <MovieImg
                      style={{ width: SCREEN_WIDTH * 0.4 }}
                      resizeMode="contain"
                      source={{
                        uri: makeImagePath(movie.backdrop_path),
                      }}
                    />
                    <MovieTitle>{movie.title}</MovieTitle>
                  </Movie>
                ))}
              </View>
            </ScrollView>
          ) : keyword.isLoading ? (
            <Loader>
              <ActivityIndicator color="red" size="large" />
            </Loader>
          ) : (
            <ScrollView>
              <SearchText>{text}에 대한 영화 검색 결과</SearchText>
              <View>
                {keyword.data?.search_movies.results.map((movie) => (
                  <Movie
                    key={movie.id}
                    onPress={() => onPressDetail(movie.id, "movie")}
                  >
                    {movie.backdrop_path ? (
                      <MovieImg
                        style={{ width: SCREEN_WIDTH * 0.4 }}
                        resizeMode="contain"
                        source={{
                          uri: makeImagePath(movie.backdrop_path),
                        }}
                      />
                    ) : (
                      <MovieNullImg style={{ width: SCREEN_WIDTH * 0.4 }}>
                        <Text style={{ color: "white" }}>이미지 없음</Text>
                      </MovieNullImg>
                    )}

                    <MovieTitle>{movie.title}</MovieTitle>
                  </Movie>
                ))}
              </View>
              <SearchText>{text}에 대한 TV 검색 결과</SearchText>
              <View>
                {keyword.data?.search_tvShow.results.map((tv) => (
                  <Movie key={tv.id} onPress={() => onPressDetail(tv.id, "tv")}>
                    {tv.backdrop_path ? (
                      <MovieImg
                        style={{ width: SCREEN_WIDTH * 0.4 }}
                        resizeMode="contain"
                        source={{
                          uri: makeImagePath(tv.backdrop_path),
                        }}
                      />
                    ) : (
                      <MovieNullImg style={{ width: SCREEN_WIDTH * 0.4 }}>
                        <Text style={{ color: "white" }}>이미지 없음</Text>
                      </MovieNullImg>
                    )}
                    <MovieTitle>{tv.name}</MovieTitle>
                  </Movie>
                ))}
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Container>
      {detailVisible ? (
        type == "movie" ? (
          <Detail programId={detailId as number} />
        ) : type == "tv" ? (
          <TvDetail programId={detailId as number} />
        ) : null
      ) : null}
    </>
  );
}
