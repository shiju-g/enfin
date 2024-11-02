/* eslint-disable @typescript-eslint/no-explicit-any */
// store/scheduleStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TimeSlot = {
  start: string;
  end: string;
};

type Schedule = {
  [key: string]: TimeSlot[];
};

interface ScheduleState {
  schedule: Schedule;
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  addTimeSlot: (day: string) => void;
  removeTimeSlot: (day: string, index: number) => void;
  updateTimeSlot: (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => void;
}

// Custom localStorage wrapper
const localStorageWrapper = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      schedule: {
        Monday: [{ start: "09:00 AM", end: "05:00 PM" }],
        Tuesday: [
          { start: "08:00 AM", end: "10:00 AM" },
          { start: "02:00 PM", end: "06:30 PM" },
        ],
        Wednesday: [{ start: "09:00 AM", end: "05:00 PM" }],
        Thursday: [{ start: "09:00 AM", end: "05:00 PM" }],
        Friday: [{ start: "09:00 AM", end: "05:00 PM" }],
        Saturday: [{ start: "09:00 AM", end: "05:00 PM" }],
        Sunday: [{ start: "09:00 AM", end: "05:00 PM" }],
      },
      selectedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], // Default selected days

      setSelectedDays: (days) => set({ selectedDays: days }),

      addTimeSlot: (day) =>
        set((state) => {
          const newSlot: TimeSlot = { start: "09:00 AM", end: "05:00 PM" };
          const updatedDaySlots = [...(state.schedule[day] || []), newSlot];
          return { schedule: { ...state.schedule, [day]: updatedDaySlots } };
        }),

      removeTimeSlot: (day, index) =>
        set((state) => {
          const updatedDaySlots = (state.schedule[day] || []).filter(
            (_, i) => i !== index
          );
          return { schedule: { ...state.schedule, [day]: updatedDaySlots } };
        }),

      updateTimeSlot: (day, index, field, value) =>
        set((state) => {
          const updatedDaySlots = [...(state.schedule[day] || [])];
          if (updatedDaySlots[index]) {
            updatedDaySlots[index][field] = value;
          }
          return { schedule: { ...state.schedule, [day]: updatedDaySlots } };
        }),
    }),
    {
      name: "schedule-storage", // Name of the key in local storage
      storage: localStorageWrapper, // Custom localStorage wrapper
    }
  )
);

export default useScheduleStore;
