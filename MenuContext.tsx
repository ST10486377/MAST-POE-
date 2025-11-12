// context/MenuContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export const COURSES = ['Starters', 'Mains', 'Desserts', 'Beverages'] as const;
export type Course = typeof COURSES[number];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  removeItem: (id: string) => void;
  setAll: (items: MenuItem[]) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used inside MenuProvider');
  return ctx;
};

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // Optional: seed example items
    // { id: '1', name: 'Sample Starter', description: 'Yummy', course: 'Starters', price: 45 },
  ]);

  const addItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: Date.now().toString() };
    setMenuItems(prev => [newItem, ...prev]);
  };

  const removeItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  const setAll = (items: MenuItem[]) => setMenuItems(items);

  return (
    <MenuContext.Provider value={{ menuItems, addItem, removeItem, setAll }}>
      {children}
    </MenuContext.Provider>
  );
}
