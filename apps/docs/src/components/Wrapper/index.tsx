import { Box, BoxProps } from 'components/Box';
import { wrapper } from './index.css';
import React from 'react';

export const Wrapper: React.FC<BoxProps> = (props: BoxProps) => {
  return <Box className={wrapper} {...props} />;
}
