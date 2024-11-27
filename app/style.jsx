import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";

export const LayoutContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  padding: 10px;
`;

export const LayoutTop = styled(View)`
  flex: 0.3;
  padding-top: 30px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 55px;
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

export default {
  LayoutContainer,
  LayoutTop,
  LayoutMiddle,
  LayoutBottom,
  LayoutText,
  LayoutBottomScoll
};
