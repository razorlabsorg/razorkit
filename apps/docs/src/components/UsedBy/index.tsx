import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { grid } from './index.css';
import React from 'react';
import { Link } from 'react-router-dom';

const frens = [
  {
    asset: 'razor-dex',
    name: 'Razor DEX',
    url: 'https://razordex.xyz/',
  },
  {
    asset: 'mosaic',
    name: 'Mosaic',
    url: 'https://mosaic.ag/',
  },
  {
    asset: 'yuzu-dex',
    name: 'Yuzu DEX',
    url: 'https://yuzudex.xyz/',
  },
];

export const UsedBy: React.FC = () => {
  return (
    <>
      <Text
        align="center"
        as="p"
        marginTop={{ md: '0', xs: '11' }}
        marginX="auto"
        size={{ md: '9', xs: '4' }}
        style={{ lineHeight: '48px', maxWidth: 720 }}
        weight="bold"
      >
        {'Trusted by the best teams on Movement.'}
      </Text>

      <Box marginTop={{ md: '11', xs: '10' }} marginX="auto">
        <Box className={grid}>
          {frens.map((fren) => (
            <Link
              to={fren.url}
              key={fren.name}
              style={{ textDecoration: 'none' }}
            >
              <Box textAlign="center">
                <Box
                  as="span"
                  borderRadius="round"
                  display="inline-block"
                  height={{
                    lg: '_48',
                    xs: '11',
                  }}
                  overflow="hidden"
                  style={{
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.4)',
                  }}
                  width={{
                    lg: '_48',
                    xs: '11',
                  }}
                >
                  <img
                    alt={fren.name}
                    height={64}
                    src={`/frens/${fren.asset}.png`}
                    width={64}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    srcSet={`
                      /frens/${fren.asset}.png 1x,
                      /frens/${fren.asset}@2x.png 2x,
                      /frens/${fren.asset}@3x.png 3x
                    `}
                    sizes="(max-width: 48px) 100vw, 48px"
                  />
                </Box>
                <Text
                  color="labelSecondary"
                  marginTop="2"
                  size={{
                    lg: '3',
                    xs: '2',
                  }}
                  variant={undefined}
                  weight="semibold"
                >
                  {fren.name}
                </Text>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
}
