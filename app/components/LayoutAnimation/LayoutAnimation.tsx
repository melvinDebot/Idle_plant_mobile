import { LayoutAnimationContainer } from "./style";
import React from "react";

interface LayoutAnimationProps {
  width: number;
  height: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  children?: React.ReactNode;
}
const LayoutAnimation: React.FC<LayoutAnimationProps> = ({
  width,
  height,
  top,
  left,
  bottom,
  right,
  children,
}) => {
  return (
    <LayoutAnimationContainer
      style={{
        width: width,
        height: height,
        top: top,
        left: left,
        bottom: bottom,
        right: right,
      }}
    >
      {children}
    </LayoutAnimationContainer>
  );
};

export default LayoutAnimation;
