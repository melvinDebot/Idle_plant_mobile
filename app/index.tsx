import {
  LayoutTop,
  LayoutBottom,
  LayoutMiddle,
  LayoutText,
  LayoutBottomScoll,
  TabsContainer
} from "./style";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";

import OxygenCounter from "./components/OxygenCounter/OxygenCounter";
import LevelIndicator from "./components/LevelIndicator/LevelIndicator";
import PlantGrowthScreen from "./components/PlantGrowthScreen/PlantGrowthScreen";
import Card from "./components/Card/Card";
import Tabs from "./components/Tabs/Tabs";

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
import { StyleSheet, TouchableOpacity } from "react-native";
import { SignalIcon } from "react-native-heroicons/solid";


export default function Index() {
  const {
    userLevel,
    currentOxygen,
    activeItems,
    currentOxygenForNextLevel,
    totalOxygenForNextLevel,
    isVibration,
    getOxygenPerSeconds,
    getUpgradeCost,
    getOxygenRequired,
    decrementOxygen,
    setActiveItems,
    incrementCardLevel,
    startTimer,
    setVibrationUser,
    // resetGame, 
    dataGame
  } = useUserContext();

  const [indexActive, setIndexActive] = useState(0); // Onglet actif par défaut
  const [activeTimerItems, setActiveTimerItems] = useState<ItemCardType[]>([]); // État pour les items timer actifs
  const insets = useSafeAreaInsets();

  const handlePressItem = (item: ItemCardType) => {
    if (item.type === "timer") {

      startTimer(item);
      setActiveTimerItems((prevItems) => [...prevItems, item]); // Ajouter l'item au tableau


      if (item.timer) {
        const [minutes, seconds] = item.timer.split(":").map(Number);
        const duration = (minutes * 60 + seconds) * 1000; // Convertir le temps en millisecondes

        setTimeout(() => {
          setActiveTimerItems((prevItems) => prevItems.filter((i) => i.id !== item.id)); // Supprimer l'item du tableau après le temps écoulé
        }, duration);
      }
      
    } else {
      decrementOxygen(getUpgradeCost(item))
    incrementCardLevel(item)
    }
  };

  const handleTabPress = (index: number) => {
    setIndexActive(index);
  };

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

  const filteredItems = itemsToDisplay.filter((item) => {
    if (indexActive === 0) return item.type === "upgrade";
    if (indexActive === 1) return item.type === "timer";
    if (indexActive === 2) return item.type === "decoration";
    return true;
  });

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
        <TouchableOpacity onPress={() => setVibrationUser()}>
          <SignalIcon fill={isVibration ? "#568828" : "grey"} size={30}/>
        </TouchableOpacity>
        
        <OxygenCounter count={currentOxygen} />
        <LevelIndicator
        level={userLevel}
        currentOxygenForNextLevel={currentOxygenForNextLevel}
        totalOxygenForNextLevel={totalOxygenForNextLevel}
      />
      </LayoutTop>
      <LayoutMiddle>
        <PlantGrowthScreen levelUser={userLevel} activeTimerItems={activeTimerItems} />
      </LayoutMiddle>
      <LayoutText>Boosters</LayoutText>
      <LayoutBottom>
        <TabsContainer>
          <Tabs index={0} indexActive={indexActive} text="Actions" onPress={() => handleTabPress(0)} />
          <Tabs index={1} indexActive={indexActive} text="Timer" onPress={() => handleTabPress(1)} />
          <Tabs index={2} indexActive={indexActive} text="Décoration" onPress={() => handleTabPress(2)}/>
        </TabsContainer>
        <LayoutBottomScoll
          showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
          {filteredItems.map((item: ItemCardType, index: number) => (
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
