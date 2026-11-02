
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { IData } from "@/types/library.type";

interface PlanContextType {
  todayPlan: IData[];
  savedWorkouts: IData[];
  completedWorkouts: number[];

  addToPlan: (workout: IData) => void;
  removeFromPlan: (id: number) => void;

  saveForLater: (workout: IData) => void;
  removeSavedWorkout: (id: number) => void;

  markAsDone: (id: number) => void;
  showToast: (message: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

export const PlanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todayPlan, setTodayPlan] = useState<IData[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<IData[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);

  const [toastMessage, setToastMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage after mounting.
  // This state restoration is intentional.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("todayPlan");
      const savedLater = localStorage.getItem("savedWorkouts");
      const savedCompleted = localStorage.getItem("completedWorkouts");

      if (savedPlan) {
        setTodayPlan(JSON.parse(savedPlan));
      }

      if (savedLater) {
        setSavedWorkouts(JSON.parse(savedLater));
      }

      if (savedCompleted) {
        setCompletedWorkouts(JSON.parse(savedCompleted));
      }
    } catch (error) {
      console.error("Failed to load workout data:", error);
    }

    setIsLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Save today's plan
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "todayPlan",
      JSON.stringify(todayPlan)
    );
  }, [todayPlan, isLoaded]);

  // Save later workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "savedWorkouts",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts, isLoaded]);

  // Save completed workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "completedWorkouts",
      JSON.stringify(completedWorkouts)
    );
  }, [completedWorkouts, isLoaded]);

  // Toast notification
  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  // Add workout to today's plan
  const addToPlan = (workout: IData) => {
    setTodayPlan((previous) => {
      const alreadyExists = previous.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return previous;
      }

      if (previous.length >= 5) {
        return previous;
      }

      return [...previous, workout];
    });

    if (todayPlan.some((item) => item.id === workout.id)) {
      showToast("Workout is already in today's plan");
      return;
    }

    if (todayPlan.length >= 5) {
      showToast("Today's plan can contain only 5 workouts");
      return;
    }

    showToast("Added to today's plan");
  };

  // Remove workout from today's plan
  const removeFromPlan = (id: number) => {
    setTodayPlan((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setCompletedWorkouts((previous) =>
      previous.filter((itemId) => itemId !== id)
    );

    showToast("Workout removed from today's plan");
  };

  // Save workout for later
  const saveForLater = (workout: IData) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      showToast("Workout is already saved");
      return;
    }

    setSavedWorkouts((previous) => [...previous, workout]);

    showToast("Saved for later");
  };

  // Remove saved workout
  const removeSavedWorkout = (id: number) => {
    setSavedWorkouts((previous) =>
      previous.filter((item) => item.id !== id)
    );

    showToast("Saved workout removed");
  };

  // Mark workout as completed
  const markAsDone = (id: number) => {
    if (completedWorkouts.includes(id)) {
      return;
    }

    setCompletedWorkouts((previous) => [...previous, id]);

    showToast("Workout marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkouts,

        addToPlan,
        removeFromPlan,

        saveForLater,
        removeSavedWorkout,

        markAsDone,
        showToast,
      }}
    >
      {children}

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 rounded-full border border-[#ccff00] bg-[#15171d] px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          ✓ {toastMessage}
        </div>
      )}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
};
