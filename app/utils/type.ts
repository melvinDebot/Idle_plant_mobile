export type ItemCardType = {
  id: number;
  title: string;
  levelRequired: number;
  levelMax: number;
  levelCard: number;
  oxygenPerSeconds: number; // Rendu optionnel
  oxygenRequired?: number[]; // Rendu optionnel
  upgradeCost?: number[]; // Rendu optionnel
  type: string;
  imageKey: string;
  timer?: string; // Certaines cartes comme "Soleil" ont un timer
};

export type ButtonType = "upgrade" | "timer" | "level" | string;

export default {};