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
import { Playground } from "components/Playground";
import { TickIcon } from "components/Icons/Tick";

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
            <Link to="/mevmDocs">
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

      <Playground />

      <Box
        backgroundColor="backgroundElevated"
        paddingY={{ xs: '11', lg: '12' }}
      >
        <Wrapper>
          <Text
            align={{ xs: 'left', md: 'center' }}
            as="h2"
            size={{ xs: '7', md: '9' }}
            style={{ lineHeight: 1 }}
            weight="bold"
          >
            {`Razor 🤝 Developers`}
          </Text>
          <Text
            align={{ xs: 'left', md: 'center' }}
            as="p"
            marginTop={{ xs: '7', md: '9' }}
            marginX="auto"
            size={{ xs: '4', md: '5' }}
            style={{ lineHeight: '28px', maxWidth: 720 }}
            weight="semibold"
          >
            {'Razor Kit provides a fast, easy and highly customizable way for developers to add a great wallet experience to their application. We handle the hard stuff so developers and teams can focus on building amazing products and communities for their users.'}
          </Text>

          <Box marginTop={{ xs: '10', md: '11' }} marginX="auto">
            <Box
              as="ul"
              display="flex"
              flexWrap="wrap"
              left={{ lg: '9' }}
              marginLeft={{ md: '10', lg: '11' }}
              paddingLeft={{ md: '3', lg: '11' }}
              position="relative"
            >
              {[
                'Easy to Install',
                'Custom Themes Support',
                'Built-in Themes',
                'Custom Wallet Lists',
                'Light and Dark Mode',
                'Support for all Movement Environments',
                'App Store and Google Play Store Integration',
                'Custom Connect Button',
              ].map((value) => (
                <Box
                  alignItems="center"
                  as="li"
                  display="flex"
                  gap="4"
                  key={value}
                  marginBottom="5"
                  width={{ xs: 'full', md: '1/2' }}
                >
                  <Box as="span" flexShrink={0}>
                    <TickIcon />
                  </Box>
                  <Text weight="bold">{value}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Wrapper>
      </Box>

      <Box
        backgroundColor="backgroundElevated"
        data-mode="light"
        paddingY={{ xs: '11', lg: '12' }}
      >
        <Wrapper>
          <Text
            align={{ xs: 'left', md: 'center' }}
            as="h2"
            size={{ xs: '7', md: '9' }}
            style={{ lineHeight: '1' }}
            weight="bold"
          >
            {'Made with ❤️ by your frens at'}{' '}
            <Box
              as="span"
              display={{ md: 'none' }}
              marginLeft="2"
              position="relative"
              top="3"
            >
              <img
                alt="Razor logo"
                height={36}
                src="/logo.png"
                width={36}
              />
            </Box>
            <Box
              as="span"
              display={{ xs: 'none', md: 'inline' }}
              marginLeft="2"
              position="relative"
              top="3"
            >
              <img
                alt="Razor logo"
                height={56}
                src="/logo.png"
                width={56}
              />
            </Box>
          </Text>
          <Text
            align={{ xs: 'left', md: 'center' }}
            as="p"
            marginX="auto"
            marginY={{ xs: '7', md: '9' }}
            size={{ xs: '4', md: '5' }}
            style={{ lineHeight: '28px', maxWidth: 720 }}
            weight="semibold"
          >
            {"We're always looking to make Razor Kit better, so please let us know how we can improve"}
          </Text>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={{ xs: '5', sm: '8' }}
            justifyContent="center"
          >
            <Button
              as="a"
              href="https://twitter.com/razordao"
              shadow
              size="xl"
              variant="razorGradient"
            >
              <Box
                as="span"
                marginX={{ sm: '4' }}
                textAlign="center"
                width="full"
              >
                {'Follow us on X'}
              </Box>
            </Button>
            <Button
              as="a"
              href="https://github.com/razorlabsorg/razorkit/discussions/new?category=feedback"
              shadow
              size="xl"
              target="_blank"
              variant="razorGradient"
            >
              <Box as="span" textAlign="center" width="full">
                {'Share Feedback with us'}
              </Box>
            </Button>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="6"
            justifyContent="center"
            marginTop={{ xs: '11', lg: '12' }}
            marginBottom={{ xs: '-11', lg: '-11' }}
            textAlign="center"
          >
            <Text color="labelTertiary" size="3" weight="bold">
              © Razor Labs {new Date().getFullYear()}
            </Text>
          </Box>
        </Wrapper>
      </Box>
    </Box>
  )
}

export default Home