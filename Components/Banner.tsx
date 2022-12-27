import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View } from "react-native";
import styled from "styled-components/native";
import { makeImagePath } from "../utills";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useSetRecoilState } from "recoil";
import { detailIdState, visibleState } from "./atoms";
import { IProgram } from "../api";

const BannerImg = styled.ImageBackground`
  z-index: 100;
  width: 100%;
  height: 100%;
  position: absolute;
`;
const BannerInfo = styled.View`
  z-index: 102;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
`;
const BannerTitle = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const BannerText = styled.Text`
  color: white;
  font-weight: 500;
`;
const BannerBox = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BannerProps {
  program: IProgram;
}

export default function Banner({ program }: BannerProps) {
  const setDetailVisible = useSetRecoilState(visibleState);
  const setDetailId = useSetRecoilState(detailIdState);

  const onPressDetail = (id: number) => {
    setDetailId(id);
    setDetailVisible(true);
  };

  return (
    <View style={{ height: SCREEN_HEIGHT * 0.7 }}>
      <BannerImg
        source={{
          uri: makeImagePath(program.poster_path || ""),
        }}
      />
      <LinearGradient
        style={{
          height: "100%",
          zIndex: 101,
          justifyContent: "flex-end",
        }}
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        start={{ x: 0, y: 1.0 }}
        end={{ x: 0, y: 0.6 }}
      >
        <BannerInfo style={{ height: SCREEN_HEIGHT * 0.1 }}>
          <BannerTitle>
            <BannerText style={{ fontSize: 18 }}>{program.title}</BannerText>
          </BannerTitle>
          <View style={{ flexDirection: "row" }}>
            <BannerBox>
              <Entypo name="plus" size={24} color="white" />
              <BannerText>내가 찜한 콘텐츠</BannerText>
            </BannerBox>
            <BannerBox>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}
              >
                <Entypo name="controller-play" size={24} color="black" />
                <BannerText
                  style={{
                    color: "black",
                    fontSize: 15,
                  }}
                >
                  {" "}
                  재생
                </BannerText>
              </View>
            </BannerBox>
            <BannerBox onPress={() => onPressDetail(program.id || NaN)}>
              <MaterialIcons name="info-outline" size={24} color="white" />
              <BannerText>정보</BannerText>
            </BannerBox>
          </View>
        </BannerInfo>
      </LinearGradient>
    </View>
  );
}
