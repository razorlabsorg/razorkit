import { Box, BoxProps } from 'components/Box';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { announcement } from './index.css';
import { Link } from 'react-router-dom';

type AnnouncementProps = {
  heading: string;
  subheading: string;
  actionTitle: string;
  actionUrl: string;
  props?: BoxProps;
};

export function Announcement({
  actionTitle,
  actionUrl,
  heading,
  props,
  subheading,
}: AnnouncementProps) {
  return (
    <Box
      as="div"
      borderColor="fillElevated"
      borderRadius="3"
      borderWidth="1"
      className={announcement}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      marginBottom="8"
      paddingBottom="5"
      paddingTop="5"
      paddingX="5"
      {...props}
    >
      <Box display="flex" flexDirection="column" gap="2">
        <Text as="h4" display="inline" variant="title3" weight="medium">
          {heading}
        </Text>
        <Text as="p" color="labelSecondary" style={{ fontWeight: 500 }}>
          {subheading}
        </Text>
      </Box>
      <Box alignItems="center" display="flex" justifyContent="center">
        <Link to={actionUrl}>
          <Button size="m" variant="blue">
            {actionTitle}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
