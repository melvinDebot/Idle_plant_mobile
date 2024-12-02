import { View, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

export const PlantGrowthScreenContainer = styled(TouchableWithoutFeedback)`
  padding: 5px;
  overflow: hidden;
`;

export const PlantGrowthScreenLayer = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const PlantGrowthScreenOverlay = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: #e6f3d4;
  position: relative;
  overflow: hidden;
`;

export const PlantGrowthScreenItem1 = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  z-index: -1;

`;

export default {
  PlantGrowthScreenContainer,
  PlantGrowthScreenOverlay,
  PlantGrowthScreenItem1,
};
