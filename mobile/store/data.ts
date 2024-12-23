import { create } from "zustand";

export type User = {
  name: String;
  weight: String;
  height: String;
  age: String;
  gender: String;
  level: string;
  objective: String;
};

type DataState = {
  user: User;
  setPageOne: (data: Omit<User, "gender" | "objective" | "level">) => void;
  setPageTwo: (data: Pick<User, "gender" | "objective" | "level">) => void;
};

export const useDataStore = create<DataState>((set) => ({
  user: {
    name: "",
    age: "",
    level: "",
    objective: "",
    gender: "",
    weight: "",
    height: "",
  },

  setPageOne: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        ...data,
      },
    })),

  setPageTwo: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        ...data,
      },
    })),
}));
