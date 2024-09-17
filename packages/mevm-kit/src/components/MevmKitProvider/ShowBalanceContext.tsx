import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ShowBalanceContextValue {
  showBalance: boolean;
  setShowBalance: (showBalance: boolean) => void;
}

const ShowBalanceContext = createContext<ShowBalanceContextValue>({
  showBalance: true,
  setShowBalance: () => {},
});

interface ShowBalanceProviderProps {
  children: ReactNode;
}

export function ShowBalanceProvider({ children }: ShowBalanceProviderProps) {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  return (
    <ShowBalanceContext.Provider value={{ showBalance, setShowBalance }}>
      {children}
    </ShowBalanceContext.Provider>
  );
}

export const useShowBalance = () => useContext(ShowBalanceContext);