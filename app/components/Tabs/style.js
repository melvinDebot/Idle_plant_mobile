import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const TabsContainer = styled(TouchableOpacity)`
  flex-grow: 1;
  height: 40px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const TabsText = styled(Text)`
  font-size: 12px;
  color: ${(props) => props.theme.tabs.text};
  font-family: GalanoGrotesqueMedium;
`;

export default {
  TabsContainer,
  TabsText,
};
