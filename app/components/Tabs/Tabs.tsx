import { TabsContainer, TabsText } from "./style";
import React from "react";

interface TabsProps {
  index: number;
  indexActive: number;
  text: string;
  onPress?: () => void;
}

const Tabs = ({ index, indexActive, text, onPress }: TabsProps) => {
  return (
    <TabsContainer
      onPress={onPress}
      style={{
        backgroundColor: indexActive === index ? "#568828" : "#FFFFFF",
      }}
    >
      <TabsText style={{
        color: indexActive === index ? "#FFFFFF" : "#000000",
      }}>{text}</TabsText>
    </TabsContainer>
  );
};

export default Tabs;
