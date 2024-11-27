import { View, TouchableOpacity, Text, Image } from "react-native";
import styled from "styled-components/native";

export const ButtonContainer = styled(TouchableOpacity)`
  width: 104px;
  height: 50px;
  background-color: ${({ disabled }) => (disabled ? "#cccccc" : "#0095d4")};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ButtonTimeContainer = styled(TouchableOpacity)`
  width: 104px;
  height: 50px;
  background-color: #0095d4;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  position: relative;
  
`;



export const ButtonContainerText = styled(View)`
  flex-direction: column;
  gap: 5px;
`;

export const ButtonText = styled(Text)`
  font-size: 14px;
  color: white;
  font-family: GalanoGrotesqueMedium;
`;

export const ButtonContainerOxygenText = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const ButtonImage = styled(Image)`
  width: 15px;
  height: 15px;
`;

export default {
  ButtonContainer,
  ButtonContainerText,
  ButtonText,
  ButtonContainerOxygenText,
  ButtonImage,
  ButtonTimeContainer,
};
