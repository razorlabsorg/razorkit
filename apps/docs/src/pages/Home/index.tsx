import { Box } from "components/Box"
import { Header } from "components/Header";
import PageMeta from "components/PageMeta";
import { Wrapper } from "components/Wrapper";
import { Text } from 'components/Text';
import { useCoolMode } from "hooks/useCoolMode"
import { Ref, useEffect, useState } from "react"
import { vars } from "css/vars.css";
import { Button } from "components/Button";
import { Link } from "react-router-dom";
import copy from 'copy-to-clipboard';
import { CheckIcon } from "components/Icons/Check";
import { CopyIcon } from "components/Icons/Copy";
import { Hero } from "components/Hero";
import { UsedBy } from "components/UsedBy";

const InstallScript: React.FC = () => {
  const [requestCopy, setRequestCopy] = useState(false);
  const code = 'npm i @razorlabs/razorkit@latest';
  const ref = useCoolMode('/razor.svg') as Ref<HTMLButtonElement>;

  useEffect(() => {
    if (requestCopy) copy(code);
    setTimeout(() => setRequestCopy(false), 3000);
  }, [requestCopy]);

  return (
    <Box
      alignItems="center"
      backgroundColor="fillElevated"
      borderRadius="round"
      color="label"
      display={{ xs: 'none', md: 'inline-flex' }}
      fontSize="2"
      paddingX="7"
      style={{ height: 44, lineHeight: 1 }}
    >
      <code>{code}</code>
      <Button
        marginLeft="7"
        onClick={() => setRequestCopy(true)}
        ref={ref}
        shape="circle"
        size="xs"
        style={{
          color: requestCopy ? vars.colors.green : vars.colors.labelTertiary,
        }}
        tabIndex={-1}
        variant="ghost"
      >
        {requestCopy ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </Box>
  );
}


const Home: React.FC = () => {
  const ref = useCoolMode('/razor.svg', false) as Ref<HTMLDivElement>;

  return (
    <Box
      backgroundColor="background"
      data-mode="dark"
      ref={ref}
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      <PageMeta color="black" />
      <Header darkMode />
      <Wrapper>
        <Box marginTop="11" textAlign="center">
          <Text
            as="h1"
            marginBottom="3"
            size={{ xs: '5', md: '8' }}
            style={{
              backgroundImage: `linear-gradient(270deg, ${vars.colors.orange70} 0%, ${vars.colors.yellow70} 100%)`,
              display: 'inline-block',
              lineHeight: 1,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            weight="bold"
          >
            Razor Kit
          </Text>
          <Text
            as="h2"
            marginBottom="5"
            size={{ xs: '7', md: '9' }}
            style={{ lineHeight: 1 }}
            weight="bold"
          >
            {'An all-in-one Wallet kit for every Movement Dapp'}
          </Text>
          <Text
            as="p"
            marginBottom="10"
            size={{ xs: '4', md: '5' }}
            style={{ lineHeight: 1 }}
            weight="semibold"
          >
            {'Designed for everyone. Built for developers.'}
          </Text>
          <Box marginBottom="8">
            <InstallScript />
          </Box>
          <Box marginBottom={{ xs: '0', md: '11' }} display="inline-flex" gap="4">
            <Link to="/aptosDocs">
              <Button as="a" size="xl" variant="razorGradient">
                {'Aptos Docs'}
              </Button>
            </Link>
            <Link to="/suiDocs">
              <Button as="a" size="xl" variant="razorGradient">
                {'Sui Docs'}
              </Button>
            </Link>
            <Link to="/aptosDocs">
              <Button as="a" size="xl" variant="razorGradient">
                {'MEVM Docs'}
              </Button>
            </Link>
          </Box>
        </Box>
      </Wrapper>

      <Hero />

      <Box
        backgroundColor="backgroundElevated"
        paddingBottom={{ xs: '11', md: '12' }}
        paddingTop={{ xs: '12', md: '10', lg: '0' }}
        style={{
          backgroundImage: 'linear-gradient(to bottom, #000, #1C1D1F)',
        }}
      >
        <Wrapper>
          <UsedBy />
        </Wrapper>
      </Box>
    </Box>
  )
}

export default Home