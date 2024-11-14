import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  color: string;
}

interface EditorStore {
  users: User[];
  currentUser: User | null;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  setCurrentUser: (user: User) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const generateRandomColor = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const useEditorStore = create<EditorStore>((set) => ({
  users: [],
  currentUser: null,
  theme: 'dark',
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  setCurrentUser: (user) =>
    set({
      currentUser: user,
    }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
}));

export const generateRandomId = () => Math.random().toString(36).substr(2, 9);

export const generateRandomName = () => {
  const adjectives = ['Swift', 'Clever', 'Bright', 'Quick', 'Smart'];
  const nouns = ['Coder', 'Dev', 'Hacker', 'Ninja', 'Wizard'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
};

export const createUser = (name?: string) => ({
  id: generateRandomId(),
  name: name || generateRandomName(),
  color: generateRandomColor(),
});