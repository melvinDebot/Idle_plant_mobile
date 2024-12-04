import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";

export const LayoutTop = styled(View)`
  flex: 0.3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 55px;

  margin-bottom: 20px;
`;

export const LayoutMiddle = styled(View)`
  flex: 2;
`;

export const LayoutText = styled(Text)`
  font-size: 21px;
  color: black;
  font-family: GalanoGrotesqueSemiBold;
  margin-top: 10px;
  margin-bottom: 10px;
`;


export const LayoutBottom = styled(View)`
  flex: 3;
  background-color: #f4faeb;
  border-radius: 11px;
  padding: 10px;
  
`;

export const LayoutBottomScoll = styled(ScrollView)`
`;

export const TabsContainer = styled(View)`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f4faeb;
  gap: 10px;
  margin-bottom: 10px;
`

export default {
  LayoutTop,
  LayoutMiddle,
  LayoutBottom,
  LayoutText,
  LayoutBottomScoll,
  TabsContainer
};
