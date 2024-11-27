import React from "react";
import {
  LevelIndicatorContainer,
  LevelIndicatorText,
  LevelIndicatorBarContainer,
  LevelIndicatorBar,
  LevelIndicatorBarOverlay,
} from "./style";

interface LevelIndicatorProps {
  level: number;
  progress: number;
}

const LevelIndicator: React.FC<LevelIndicatorProps> = ({ level, progress }) => {
  return (
    <LevelIndicatorContainer>
      <LevelIndicatorText>Level {level}</LevelIndicatorText>
      <LevelIndicatorBarContainer>
        <LevelIndicatorBar>
          <LevelIndicatorBarOverlay style={{ width: `${progress}%` }} />
        </LevelIndicatorBar>
      </LevelIndicatorBarContainer>
    </LevelIndicatorContainer>
  );
};

export default LevelIndicator;
