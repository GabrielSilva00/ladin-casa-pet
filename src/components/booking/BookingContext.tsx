"use client";

import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import type { PetStep, ServicesStep, ScheduleStep, TutorStep } from "@/lib/booking/schema";

export const STEP_IDS = ["pet", "service", "schedule", "tutor", "review"] as const;
export type StepId = (typeof STEP_IDS)[number];

type State = Partial<PetStep & ServicesStep & ScheduleStep & TutorStep> & {
  current: StepId;
  reached: Record<StepId, boolean>;
};

type Action =
  | { type: "GOTO"; step: StepId }
  | { type: "SET_PET"; data: PetStep }
  | { type: "SET_SERVICES"; data: ServicesStep }
  | { type: "SET_SCHEDULE"; data: ScheduleStep }
  | { type: "SET_TUTOR"; data: TutorStep }
  | { type: "RESET" };

const initial: State = {
  current: "pet",
  reached: { pet: true, service: false, schedule: false, tutor: false, review: false }
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GOTO": {
      const reached = { ...state.reached, [action.step]: true };
      return { ...state, current: action.step, reached };
    }
    case "SET_PET":
      return { ...state, ...action.data, current: "service", reached: { ...state.reached, service: true } };
    case "SET_SERVICES":
      return { ...state, ...action.data, current: "schedule", reached: { ...state.reached, schedule: true } };
    case "SET_SCHEDULE":
      return { ...state, ...action.data, current: "tutor", reached: { ...state.reached, tutor: true } };
    case "SET_TUTOR":
      return { ...state, ...action.data, current: "review", reached: { ...state.reached, review: true } };
    case "RESET":
      return initial;
    default:
      return state;
  }
}

type Ctx = {
  state: State;
  goto: (step: StepId) => void;
  setPet: (d: PetStep) => void;
  setServices: (d: ServicesStep) => void;
  setSchedule: (d: ScheduleStep) => void;
  setTutor: (d: TutorStep) => void;
  reset: () => void;
  stepIndex: number;
  totalSteps: number;
};

const BookingCtx = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const value = useMemo<Ctx>(() => ({
    state,
    goto: (step) => dispatch({ type: "GOTO", step }),
    setPet: (d) => dispatch({ type: "SET_PET", data: d }),
    setServices: (d) => dispatch({ type: "SET_SERVICES", data: d }),
    setSchedule: (d) => dispatch({ type: "SET_SCHEDULE", data: d }),
    setTutor: (d) => dispatch({ type: "SET_TUTOR", data: d }),
    reset: () => dispatch({ type: "RESET" }),
    stepIndex: STEP_IDS.indexOf(state.current),
    totalSteps: STEP_IDS.length
  }), [state]);

  return <BookingCtx.Provider value={value}>{children}</BookingCtx.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
