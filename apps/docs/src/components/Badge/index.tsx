import { Box, BoxProps } from 'components/Box';
import { badge } from './index.css';

const Badge: React.FC<BoxProps> = (props: BoxProps) => {
  return <Box as="span" className={badge} {...props} />;
}

export default Badge
