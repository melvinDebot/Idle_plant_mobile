import {
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

// UTILS
import getImageCard from "./utils/getImageCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useUserContext } from "./context/UserContext";

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from "react-native";





export default function Index() {
  const {
    userLevel,
    currentOxygen,
    activeItems,
    currentOxygenForNextLevel,
    totalOxygenForNextLevel,
    getOxygenPerSeconds,
    getUpgradeCost,
    getOxygenRequired,
    decrementOxygen,
    setActiveItems,
    incrementCardLevel,
    // resetGame, 
    dataGame
  } = useUserContext();


  const insets = useSafeAreaInsets();

  const handlePressItem = (item: ItemCardType) => { 
    decrementOxygen(getUpgradeCost(item))
    incrementCardLevel(item)
  }

  useEffect(() => {
    const initializeActiveItems = async () => {
      const savedItems = await AsyncStorage.getItem("activeItems");
      if (savedItems) {
        setActiveItems(JSON.parse(savedItems));
      } else if (dataGame && dataGame.cards) {
        setActiveItems(dataGame.cards);
      }
    };

    initializeActiveItems();
  }, [dataGame, setActiveItems]);


  const itemsToDisplay = activeItems.length > 0 ? activeItems : dataGame.cards;

  //RESET GAME FOR DEBUG
  // useEffect(() => {
  //   resetGame()
  // }, [])


  const [loaded] = useFonts({
    GalanoGrotesqueMedium,
    GalanoGrotesqueRegular,
    GalanoGrotesqueSemiBold,
  });

  if (!loaded) {
    return null;
  }


  return (
    <SafeAreaView style={[styles.layoutContainer, { paddingTop: insets.top }]}>
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
      <LayoutText>Boosters</LayoutText>
      <LayoutBottom>
        <LayoutBottomScoll
          showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
          {itemsToDisplay.map((item: ItemCardType, index: number) => (
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
              
              onPress={() => handlePressItem(item)}
            />
          ))}
          
        </LayoutBottomScoll>
      </LayoutBottom>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
});
