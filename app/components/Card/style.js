import { View, Image, Text } from "react-native";
import styled from "styled-components/native";

export const CardContainer = styled(View)`
  width: 100%;
  height: 72px;
  position: relative;
  margin-top: 10px;
`;

export const CardWrapper = styled(View)`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  background-color: white;
  border-radius: 7px;
`;

export const CardOverlay = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  opacity: 0.9;
  border-radius: 7px;
  bottom: 0px;
  left: 0;
  z-index: 999;
`;

export const CardImage = styled(Image)`
  width: 59px;
  height: 59px;
`;

export const CardTextContainer = styled(View)`
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 10px;
  align-items: flex-start;
  flex-grow: 1;
`;

export const CardTitle = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: GalanoGrotesqueSemiBold;
`;

export const CardSubTitle = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: GalanoGrotesqueRegular;
`;

export const CardText = styled(Text)`
  font-size: 12px;
  color: #568828;
  font-family: GalanoGrotesqueRegular;
`;

export default {
  CardContainer,
  CardImage,
  CardTextContainer,
  CardTitle,
  CardSubTitle,
  CardText,
};
