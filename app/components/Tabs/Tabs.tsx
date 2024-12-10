import { TabsContainer, TabsText } from "./style";
import React from "react";
import { useColorScheme } from "react-native";

interface TabsProps {
  index: number;
  indexActive: number;
  text: string;
  onPress?: () => void;
}

const Tabs = ({ index, indexActive, text, onPress }: TabsProps) => {
  const scheme = useColorScheme();
  const isActive = indexActive === index;

  const backgroundColor = isActive
    ? scheme === "dark"
      ? "#568828"
      : "#568828"
    : scheme === "dark"
    ? "transparent"
    : "white";

  const textColor = isActive
    ? "white"
    : scheme === "dark"
    ? "#E6F3D4"
    : "black";

  return (
    <TabsContainer onPress={onPress} style={{ backgroundColor }}>
      <TabsText style={{ color: textColor }}>{text}</TabsText>
    </TabsContainer>
  );
};

export default Tabs;
