import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { ItemCardType } from "./utils/type";

type UserContextType = {
  userLevel: number; // Niveau actuel de l'utilisateur
  currentOxygen: number; // Quantité d'oxygène actuelle (utilisable)
  totalOxygenForNextLevel: number; // Quantité totale d'oxygène nécessaire pour passer au niveau suivant
  currentOxygenForNextLevel: number; // Progrès accumulé vers le niveau suivant
  incrementOxygen: (amount: number) => void; // Fonction pour ajouter de l'oxygène
  incrementLevel: () => void; // Fonction pour augmenter le niveau utilisateur
  getOxygenPerSeconds: (item: ItemCardType) => number; // Fonction pour récupérer oxygenPerSeconds
  getOxygenRequired: (item: ItemCardType) => number; // Fonction pour récupérer oxygenRequired
  getUpgradeCost: (item: ItemCardType) => number; // Fonction pour récupérer upgradeCost
  decrementOxygen: (amount: number) => void; // Fonction pour décrémenter l'oxygène
  setActiveItems: (items: ItemCardType[]) => void; // Fonction pour définir les items actifs
  incrementCardLevel: (item: ItemCardType) => () => void; // Fonction pour augmenter le niveau de la carte
};

// Création du contexte
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider du contexte
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userLevel, setUserLevel] = useState<number>(0); // Niveau de départ
  const [currentOxygen, setCurrentOxygen] = useState<number>(0); // Oxygène disponible
  const [progressOxygen, setProgressOxygen] = useState<number>(0); // Progrès d'oxygène accumulé
  const [totalOxygenForNextLevel, setTotalOxygenForNextLevel] = useState<
    number
  >(100); // Oxygène requis pour passer au niveau suivant
  const [activeItems, setActiveItems] = useState<ItemCardType[]>([]); // Liste des items actifs

  const currentOxygenForNextLevel = Math.min(
    progressOxygen,
    totalOxygenForNextLevel
  );

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

  {/* TODO FIX LEVEL */}
  const incrementCardLevel = (item: ItemCardType) => {
    if (item.levelCard >= 50) return;

    const interval = setInterval(() => {
      setActiveItems((prevItems) => {
        return prevItems.map((prevItem) => {
          if (prevItem.id === item.id) {
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
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const incrementLevel = () => {
    setUserLevel((prevLevel) => prevLevel + 1);
    setTotalOxygenForNextLevel((prevTotal) => Math.floor(prevTotal * 1.5));
  };

  const decrementOxygen = (amount: number): void => {
    setCurrentOxygen((prevOxygen) => {
      if (prevOxygen < amount) {
        console.warn("Not enough oxygen to perform this action.");
        return prevOxygen;
      }

      return Math.max(0, prevOxygen - amount);
    });
  };

  const getOxygenPerSeconds = (item: ItemCardType): number => {
    if (!item.oxygenPerSeconds || item.oxygenPerSeconds.length === 0) {
      return 0;
    }

    const index = Math.max(
      0,
      Math.min(userLevel - item.levelRequired, item.oxygenPerSeconds.length - 1)
    );

    return item.oxygenPerSeconds[index];
  };

  const getOxygenRequired = (item: ItemCardType): number => {
    if (!item.oxygenRequired || item.oxygenRequired.length === 0) {
      return 0;
    }

    const index = Math.max(
      0,
      Math.min(userLevel - item.levelRequired, item.oxygenRequired.length - 1)
    );

    return item.oxygenRequired[index];
  };

  const getUpgradeCost = (item: ItemCardType): number => {
    if (!item.upgradeCost || item.upgradeCost.length === 0) {
      return 0;
    }
    const index = Math.max(
      0,
      Math.min(userLevel - item.levelRequired, item.upgradeCost.length - 1)
    );
    return item.upgradeCost[index];
  };

 // --- NOUVEAU : Incrément automatique d'oxygène basé sur oxygenPerSeconds ---
useEffect(() => {
  const interval = setInterval(() => {
    // Filtre les items actifs en fonction du niveau requis
    const filteredItems = activeItems.filter(item => userLevel >= item.levelRequired);
    // Calcule le total d'oxygène par seconde à partir des items actifs filtrés
    const totalOxygenPerSecond = filteredItems.reduce((total, item) => {
      const oxygenPerSecond = getOxygenPerSeconds(item);
      return total + oxygenPerSecond;
    }, 0);

    // Ajoute cet oxygène automatiquement
    if (totalOxygenPerSecond > 0) {
      incrementOxygen(totalOxygenPerSecond);
    }
  }, 1000); // Toutes les 1 seconde

  // Nettoyage de l'intervalle lors du démontage
  return () => clearInterval(interval);
}, [activeItems, userLevel]); // Redémarre si les items actifs ou le niveau changent
  // --------------------------------------------------------------------------

  const value = {
    userLevel,
    currentOxygen,
    totalOxygenForNextLevel,
    currentOxygenForNextLevel,
    incrementOxygen,
    decrementOxygen,
    incrementLevel,
    getOxygenPerSeconds,
    getOxygenRequired,
    getUpgradeCost,
    setActiveItems,
    incrementCardLevel
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};