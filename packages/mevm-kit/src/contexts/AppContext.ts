import React, { ReactNode, createContext } from 'react';

export type DisclaimerComponent = React.FunctionComponent<{
  Text: React.FunctionComponent<{ children: ReactNode }>;
  Link: React.FunctionComponent<{ children: ReactNode; href: string }>;
}>;

export const defaultAppInfo = {
  appName: undefined,
  disclaimer: undefined,
  learnMoreUrl:
    'https://razorwallet.xyz',
};

export const AppContext = createContext<{
  appName?: string;
  learnMoreUrl?: string;
  disclaimer?: DisclaimerComponent;
}>(defaultAppInfo);
