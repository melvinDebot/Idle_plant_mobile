import { View, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

export const PlantGrowthScreenContainer = styled(TouchableWithoutFeedback)`
  padding: 5px;
  overflow: hidden;
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
`;

export default {
  PlantGrowthScreenContainer,
  PlantGrowthScreenOverlay,
  PlantGrowthScreenItem1,
};
