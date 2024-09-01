import { Box } from "components/Box";
import { Text } from 'components/Text';
import { header, logo, row } from "./index.css";
import { Link } from "react-router-dom";
import kitPackage from '../../../../../packages/razor-kit/package.json'
import Badge from "components/Badge";

const RAZOR_KIT_VERSION = kitPackage.version

type HeaderProps = {
  darkMode?: boolean;
  docsMobileMenuRef?: React.RefObject<HTMLDivElement>;
  sticky?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  docsMobileMenuRef,
  sticky,
  ...props
}: HeaderProps) => {
  return (
    <Box className={sticky ? header : undefined} {...props}>
      <Box className={row}>
        <Link to={'/'}>
          <Box
            alt="Razor Logo"
            as="img"
            className={logo}
            marginRight={'4'}
            src="/razor.svg"
            transform={{
              active: 'shrink',
              hover: 'grow'
            }}
            transitionDuration={'100'}
            transitionProperty="transform"
            transitionTimingFunction="ease"
          />
        </Link>

        <Box
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={{ xs: '1', sm: '4' }}
        >
          <Text style={{ lineHeight: 1 }} variant="title3" weight="bold">
            Razor Kit
          </Text>
          <Badge>{RAZOR_KIT_VERSION}</Badge>
        </Box>

        <Box style={{ marginLeft: 'auto' }}>
        </Box>
      </Box>
      {docsMobileMenuRef && (
        <Box
          borderBottomWidth="1"
          borderColor="separator"
          display={{ lg: 'none' }}
          paddingX={{ xs: '6', sm: '6', md: '10', lg: '10' }}
          paddingY="4"
          ref={docsMobileMenuRef}
        />
      )}
    </Box>
  )
}