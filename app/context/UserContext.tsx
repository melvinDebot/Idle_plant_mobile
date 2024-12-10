import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dataJson from "../utils/data.json"
import type { ItemCardType } from "../utils/type";

type UserContextType = {
  userLevel: number; // Niveau actuel de l'utilisateur
  currentOxygen: number; // Quantité d'oxygène actuelle (utilisable)
  totalOxygenForNextLevel: number; // Quantité totale d'oxygène nécessaire pour passer au niveau suivant
  currentOxygenForNextLevel: number; // Progrès accumulé vers le niveau suivant
  activeItems: ItemCardType[]; // Liste des items actifs
  isVibration: boolean; // État de vibration de l'utilisateur
  incrementOxygen: (amount: number) => void; // Fonction pour ajouter de l'oxygène
  incrementLevel: () => void; // Fonction pour augmenter le niveau utilisateur
  getOxygenPerSeconds: (item: ItemCardType) => number; // Fonction pour récupérer oxygenPerSeconds
  getOxygenRequired: (item: ItemCardType) => number; // Fonction pour récupérer oxygenRequired
  getUpgradeCost: (item: ItemCardType) => number; // Fonction pour récupérer upgradeCost
  decrementOxygen: (amount: number) => void; // Fonction pour décrémenter l'oxygène
  setActiveItems: (items: ItemCardType[]) => void; // Fonction pour définir les items actifs
  incrementCardLevel: (item: ItemCardType) => void; // Fonction pour augmenter le niveau de la carte
  resetGame: () => void; // Fonction pour réinitialiser le jeu
  dataGame: { cards: ItemCardType[] }; // Données de jeu
  startTimer: (item: ItemCardType) => void; // Fonction pour démarrer le timer
  setVibrationUser: () => void; // Fonction pour activer/désactiver la vibration
};

// Création du contexte
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider du contexte
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userLevel, setUserLevel] = useState<number>(0); // Niveau de départ
  const [currentOxygen, setCurrentOxygen] = useState<number>(0); // Oxygène disponible
  const [progressOxygen, setProgressOxygen] = useState<number>(0); // Progrès d'oxygène accumulé
  const [totalOxygenForNextLevel, setTotalOxygenForNextLevel] = useState<number>(100); // Oxygène requis pour passer au niveau suivant
  const [activeItems, setActiveItems] = useState<ItemCardType[]>(dataJson.cards); // Liste des items actifs
  const [dataGame, setDataGame] = useState<{ cards: ItemCardType[] }>({ cards: dataJson.cards });
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerItem, setTimerItem] = useState<ItemCardType | null>(null);
  const [isVibration, setIsVibration] = useState<boolean>(true);

  const currentOxygenForNextLevel = Math.min(progressOxygen, totalOxygenForNextLevel);

  // Tableau des valeurs d'oxygène nécessaires pour chaque niveau
  const oxygenRequirements = [
    100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000,
    // Ajoutez plus de valeurs selon vos besoins
  ];

  // Charger les données initiales à partir de AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem("userLevel");
        const saveIsVibration = await AsyncStorage.getItem("isVibration");
        const savedOxygen = await AsyncStorage.getItem("currentOxygen");
        const savedProgress = await AsyncStorage.getItem("progressOxygen");
        const savedTotal = await AsyncStorage.getItem("totalOxygenForNextLevel");
        const savedItems = await AsyncStorage.getItem("activeItems");
        const savedDataGame = await AsyncStorage.getItem("dataGame");

        if (savedLevel !== null) setUserLevel(parseInt(savedLevel, 10));
        if (saveIsVibration !== null) setIsVibration(JSON.parse(saveIsVibration));
        if (savedOxygen !== null) setCurrentOxygen(parseInt(savedOxygen, 10));
        if (savedProgress !== null) setProgressOxygen(parseInt(savedProgress, 10));
        if (savedTotal !== null) setTotalOxygenForNextLevel(parseInt(savedTotal, 10));
        if (savedItems !== null) setActiveItems(JSON.parse(savedItems));
        if (savedDataGame !== null) setDataGame(JSON.parse(savedDataGame));
      } catch (error) {
        console.error("Failed to load data from AsyncStorage", error);
      }
    };

    loadData();
  }, []);

  // Mettre à jour AsyncStorage chaque fois que les données de jeu changent
  useEffect(() => {
    AsyncStorage.setItem("userLevel", userLevel.toString());
  }, [userLevel]);

  useEffect(() => {
    AsyncStorage.setItem("currentOxygen", currentOxygen.toString());
  }, [currentOxygen]);

  useEffect(() => {
    AsyncStorage.setItem("progressOxygen", progressOxygen.toString());
  }, [progressOxygen]);

  useEffect(() => {
    AsyncStorage.setItem("totalOxygenForNextLevel", totalOxygenForNextLevel.toString());
  }, [totalOxygenForNextLevel]);

  useEffect(() => {
    AsyncStorage.setItem("activeItems", JSON.stringify(activeItems));
  }, [activeItems]);

  // Mettre à jour totalOxygenForNextLevel en fonction du niveau de l'utilisateur
  useEffect(() => {
    const nextLevel = userLevel + 1;
    setTotalOxygenForNextLevel(oxygenRequirements[nextLevel] || totalOxygenForNextLevel * 1);
  }, [userLevel]);

  const incrementOxygen = (amount: number) => {
    setCurrentOxygen((prevOxygen) => prevOxygen + amount); // Ajoute à l'oxygène utilisable
    setProgressOxygen((prevProgress) => {
      const newProgress = prevProgress + amount;

      if (newProgress >= totalOxygenForNextLevel) {
        incrementLevel();
        return newProgress - totalOxygenForNextLevel;
      }

      return newProgress;
    });
  };

 const incrementLevel = () => {
    setUserLevel((prevLevel) => {
      const newLevel = prevLevel + 1;
      if (newLevel >= 100) {
        return 100; // Niveau maximum
      }
      AsyncStorage.setItem("userLevel", newLevel.toString());
      return newLevel;
    });

    setTotalOxygenForNextLevel((prevTotal) => {
      // Multipliez par 2 à chaque niveau
      const newTotal = prevTotal * 2;
      AsyncStorage.setItem("totalOxygenForNextLevel", newTotal.toString());
      return newTotal;
    });
  };

  const incrementCardLevel = (item: ItemCardType) => {
    setActiveItems((prevItems) => {
      const updatedItems = prevItems.map((prevItem) => {
        if (prevItem.id === item.id && prevItem.levelCard < item.levelMax) {
          const newLevel = prevItem.levelCard + 1;
          const newOxygenPerSeconds = prevItem.oxygenPerSeconds + 1; // Ajustez la logique selon vos besoins
          return {
            ...prevItem,
            levelCard: newLevel,
            oxygenPerSeconds: newOxygenPerSeconds,
          };
        }
        return prevItem;
      });
      AsyncStorage.setItem("activeItems", JSON.stringify(updatedItems)); // Sauvegarder les items mis à jour
      return updatedItems;
    });
  };

  const decrementOxygen = (amount: number): void => {
    setCurrentOxygen((prevOxygen) => Math.max(prevOxygen - amount, 0));
  };

  const getOxygenPerSeconds = (item: ItemCardType): number => {
    return item.oxygenPerSeconds;
  };

  const getOxygenRequired = (item: ItemCardType): number => {
    if (!item.oxygenRequired || item.oxygenRequired.length === 0) {
      return 0;
    }

    const index = Math.max(
      0,
      Math.min(item.levelCard - item.levelRequired, item.oxygenRequired.length - 1)
    );

    return item.oxygenRequired[index];
  };

  const getUpgradeCost = (item: ItemCardType): number => {
    if (!item.upgradeCost || item.upgradeCost.length === 0) {
      return 0;
    }
    const index = Math.max(
      0,
      Math.min(item.levelCard - item.levelRequired, item.upgradeCost.length - 1)
    );
    return item.upgradeCost[index];
  };

  const setVibrationUser = () => {
    setIsVibration(!isVibration);
    AsyncStorage.setItem("isVibration", JSON.stringify(!isVibration));
  }

  const startTimer = (item: ItemCardType) => {
    setTimerActive(true);
    setTimerItem(item);
  };

  useEffect(() => {
  let timerInterval: NodeJS.Timeout;
  if (timerActive && timerItem && timerItem.timer) {
    const [minutes, seconds] = timerItem.timer.split(":").map(Number);
    const duration = (minutes * 60 + seconds) * 1000; // Convertir le temps en millisecondes

    timerInterval = setInterval(() => {
      incrementOxygen(timerItem.oxygenPerSeconds);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerInterval);
      setTimerActive(false);
      setTimerItem(null);
    }, duration);
  }
  return () => clearInterval(timerInterval);
}, [timerActive, timerItem]);

  const resetGame = async () => {
    try {
      await AsyncStorage.setItem("userLevel", "0");
      await AsyncStorage.setItem("currentOxygen", "0");
      await AsyncStorage.setItem("progressOxygen", "0");
      await AsyncStorage.setItem("totalOxygenForNextLevel", "100");
      await AsyncStorage.setItem("activeItems", JSON.stringify([]));
      await AsyncStorage.setItem("dataGame", JSON.stringify(dataJson));

      setUserLevel(0);
      setCurrentOxygen(0);
      setProgressOxygen(0);
      setTotalOxygenForNextLevel(100);
      setActiveItems(dataJson.cards);
    } catch (error) {
      console.error("Failed to reset data in AsyncStorage", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredItems = activeItems.filter(item => userLevel >= item.levelRequired);

      const totalOxygenPerSecond = filteredItems.reduce((total, item) => {
        const oxygenPerSecond = getOxygenPerSeconds(item);
        return total + oxygenPerSecond;
      }, 0);

      if (totalOxygenPerSecond > 0) {
        incrementOxygen(totalOxygenPerSecond);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeItems, userLevel]);

  const value = {
    userLevel,
    currentOxygen,
    totalOxygenForNextLevel,
    currentOxygenForNextLevel,
    activeItems,
    dataGame,
    isVibration,
    incrementOxygen,
    decrementOxygen,
    incrementLevel,
    getOxygenPerSeconds,
    getOxygenRequired,
    getUpgradeCost,
    setActiveItems,
    incrementCardLevel,
    resetGame,
    startTimer,
    setVibrationUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;