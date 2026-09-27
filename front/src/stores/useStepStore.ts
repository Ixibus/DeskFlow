import { create } from "zustand";

type StepStore = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

export const useStepStore = create<StepStore>((set) => ({
  activeStep: 1,
  setActiveStep: (step) => set({ activeStep: step }),
}));