import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { IGetProgramResult } from "../api";
import { makeImagePath } from "../utills";
import { detailIdState, visibleState } from "./atoms";
import { SCREEN_HEIGHT } from "./Banner";

const SliderView = styled.View`
  margin-bottom: 5px;
  margin-left: 1.5px;
`;
const SliderTitle = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 16px;
`;

const Box = styled.Image`
  width: 110px;
  margin: 0 5px;
  border-radius: 10px;
`;

interface SliderProps {
  data: IGetProgramResult;
  title: string;
}

export default function Slider({ data, title }: SliderProps) {
  const setDetailVisible = useSetRecoilState(visibleState);
  const setDetailId = useSetRecoilState(detailIdState);

  const onPressDetail = (id: number) => {
    setDetailId(id);
    setDetailVisible(true);
  };
  return (
    <SliderView>
      <SliderTitle>{title}</SliderTitle>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.results.slice(1).map((program) => (
          <TouchableOpacity
            key={program.id}
            onPress={() => onPressDetail(program.id)}
          >
            <Box
              style={{ height: SCREEN_HEIGHT * 0.2 }}
              resizeMode="contain"
              source={{
                uri: makeImagePath(program.poster_path),
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SliderView>
  );
}
