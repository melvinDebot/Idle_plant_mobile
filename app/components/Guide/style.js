import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const GuideContainer = styled(ScrollView)`
  flex: 1;
  background-color: #6aa033;
  position: relative;
`;

export const GuideSldes = styled(View)`
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
`;

export const GuideImage = styled(Image)`
  width: 300px;
  height: 300px;
  margin-bottom: 10px;
  resize-mode: contain;
  align-self: center;
`;

export const GuideTitle = styled(Text)`
  font-size: 21px;
  margin-bottom: 20px;
  font-family: GalanoGrotesqueSemiBold;
  color: white;
`;

export const GuideText = styled(Text)`
  font-size: 14px;
  margin-bottom: 10px;
  font-family: GalanoGrotesqueSemiBold;
  color: white;
  line-height: 20px;
`;

export const GuideButton = styled(TouchableOpacity)`
  position: absolute;
  width: 47px;
  height: 47px;
  background-color: white;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50px;
  right: 20px;
  z-index: 999;
`;

export default {
  GuideContainer,
  GuideSldes,
  GuideImage,
  GuideTitle,
  GuideText,
  GuideButton,
};
