import { View, Text, Image } from "react-native";
import styled from "styled-components/native";

export const OxygenCounterContainer = styled(View)`
  width: 103px;
  height: 26px;
  border-radius: 3px;
  background-color: #e6f3d4;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  gap: 25px;
`;

export const OxygenCounterText = styled(Text)`
  font-size: 15px;
  color: black;
  font-family: GalanoGrotesqueSemiBold;

`;

export const OxygenCounterImage = styled(Image)`
  width: 15px;
  height: 15px;

`;

export default {
  OxygenCounterContainer,
  OxygenCounterText,
  OxygenCounterImage,
};
