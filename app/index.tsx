import {
  LayoutContainer,
  LayoutTop,
  LayoutBottom,
  LayoutMiddle,
  LayoutText,
  LayoutBottomScoll,
} from "./style";
import { useFonts } from "expo-font";
import React from "react";

import OxygenCounter from "./components/OxygenCounter/OxygenCounter";
import LevelIndicator from "./components/LevelIndicator/LevelIndicator";
import PlantGrowthScreen from "./components/PlantGrowthScreen/PlantGrowthScreen";
import Card from "./components/Card/Card";

// FONTS
import GalanoGrotesqueMedium from "../assets/fonts/GalanoGrotesque-Medium.ttf";
import GalanoGrotesqueRegular from "../assets/fonts/GalanoGrotesque-Regular.ttf";
import GalanoGrotesqueSemiBold from "../assets/fonts/GalanoGrotesque-SemiBold.ttf";

// IMAGES
import WaterCanImg from "../assets/images/cards/watering_can.png";


export default function Index() {
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
        <OxygenCounter count={5} />
        <LevelIndicator level={0} progress={50} />
      </LayoutTop>
      <LayoutMiddle>
        <PlantGrowthScreen levelUser={1}/>
      </LayoutMiddle>
      <LayoutText>Booster</LayoutText>
      <LayoutBottom>
        <LayoutBottomScoll>
          <Card
            image={WaterCanImg}
            title="Arroser la plante"
            level={10}
            numberOxygen={5}
            buttonType="upgrade"
            isDisabled={false}
            levelRequired={5}
            levelUser={5}
            timer="00:30"
          />
          <Card
            image={WaterCanImg}
            title="Arroser la plante"
            level={10}
            numberOxygen={10}
            buttonType="upgrade"
            isDisabled={false}
            levelRequired={5}
            levelUser={5}
          />
          <Card
            image={WaterCanImg}
            title="Arroser la plante"
            level={10}
            numberOxygen={10}
            buttonType="upgrade"
            isDisabled={true}
            levelRequired={5}
            levelUser={5}
          />
          <Card
            image={WaterCanImg}
            title="Arroser la plante"
            level={10}
            numberOxygen={10}
            buttonType="level"
            isDisabled={true}
            levelRequired={5}
            levelUser={5}
          />
          <Card
            image={WaterCanImg}
            title="Arroser la plante"
            level={10}
            numberOxygen={10}
            buttonType="timer"
            isDisabled={true}
            levelRequired={5}
            levelUser={5}
            timer="00:30"
          />
          <Card
            image={WaterCanImg}
            title="Arroser la plante"
            level={10}
            numberOxygen={10}
            buttonType="timer"
            isDisabled={true}
            levelRequired={5}
            levelUser={5}
            timer="00:60"
          />
        </LayoutBottomScoll>
      </LayoutBottom>
    </LayoutContainer>
  );
}
