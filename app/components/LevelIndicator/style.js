import { View, Text } from "react-native";
import styled from "styled-components/native";

export const LevelIndicatorContainer = styled(View)`
  gap: 10px;
  flex-direction: column;
  width: 80px;
`;

export const LevelIndicatorText = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.text};
  font-family: GalanoGrotesqueSemiBold;
`;

export const LevelIndicatorBarContainer = styled(View)`
  width: 100%;
  height: 7px;
  position: relative;
`;

export const LevelIndicatorBar = styled(View)`
  width: 100%;
  height: 100%;
  top: 0;
  psoition: absolute;
  border-radius: 3px;
  background-color: #cee9ad;
  z-index: 2;
`;

export const LevelIndicatorBarOverlay = styled(View)`
  width: 0px;
  height: 100%;
  psoition: absolute;
  border-radius: 3px;
  background-color: #385420;
  z-index: 1;
  top: 0;
`;

export default {
  LevelIndicatorContainer,
  LevelIndicatorText,
  LevelIndicatorBarContainer,
  LevelIndicatorBar,
  LevelIndicatorBarOverlay,
};
