import {
  LayoutContainer,
  LayoutTop,
  LayoutBottom,
  LayoutMiddle,
  LayoutText,
  LayoutBottomScoll,
} from "./style";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";

import OxygenCounter from "./components/OxygenCounter/OxygenCounter";
import LevelIndicator from "./components/LevelIndicator/LevelIndicator";
import PlantGrowthScreen from "./components/PlantGrowthScreen/PlantGrowthScreen";
import Card from "./components/Card/Card";

// FONTS
import GalanoGrotesqueMedium from "../assets/fonts/GalanoGrotesque-Medium.ttf";
import GalanoGrotesqueRegular from "../assets/fonts/GalanoGrotesque-Regular.ttf";
import GalanoGrotesqueSemiBold from "../assets/fonts/GalanoGrotesque-SemiBold.ttf";

// TYPES
import type {ItemCardType} from "./utils/type"

// DATA GAME
import dataGame from "./utils/data.json"
import getImageCard from "./utils/getImageCard";


import { useUserContext } from "./context/UserContext";


export default function Index() {
  const {
    userLevel,
    currentOxygen,
    getOxygenPerSeconds,
    getUpgradeCost,
    getOxygenRequired,
    currentOxygenForNextLevel,
    totalOxygenForNextLevel,
    decrementOxygen,
    setActiveItems
  } = useUserContext();

  useEffect(() => {
  if (dataGame && dataGame.cards) {
    setActiveItems(dataGame.cards);
  }
}, [userLevel, dataGame]);

  const [loaded] = useFonts({
    GalanoGrotesqueMedium,
    GalanoGrotesqueRegular,
    GalanoGrotesqueSemiBold,
  });

  if (!loaded) {
    return null;
  }


  return (
    <LayoutContainer>
      <LayoutTop>
        <OxygenCounter count={currentOxygen} />
        <LevelIndicator
        level={userLevel}
        currentOxygenForNextLevel={currentOxygenForNextLevel}
        totalOxygenForNextLevel={totalOxygenForNextLevel}
      />
      </LayoutTop>
      <LayoutMiddle>
        <PlantGrowthScreen levelUser={userLevel} />
      </LayoutMiddle>
      <LayoutText>Booster</LayoutText>
      <LayoutBottom>
        <LayoutBottomScoll>
          {dataGame.cards.map((item: ItemCardType, index: number) => (
            <Card
              key={index}
              levelCardRequired={item.levelRequired}
              image={getImageCard(item.imageKey)}
              title={item.title}
              level={item.levelCard}
              numberOxygen={getOxygenPerSeconds(item)} 
              buttonType={item.type}
              upgradeCost={getOxygenRequired(item)}
              isDisabled={userLevel < item.levelRequired || currentOxygen < getOxygenRequired(item)}
             
              levelUser={userLevel}
              timer={item?.timer}
              onPress={() => decrementOxygen(getUpgradeCost(item))}
            />
          ))}
          
        </LayoutBottomScoll>
      </LayoutBottom>
    </LayoutContainer>
  );
}
