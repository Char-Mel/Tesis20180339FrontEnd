import { Box, Card, Container, 
  // Button, 
  styled } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
// import router from 'src/router';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';
import Hero from './Hero';
// import Highlights from './Highlights';
// import LanguageSwitcher from 'src/layouts/BoxedSidebarLayout/Header/Buttons/LanguageSwitcher';
// import Footer from 'src/components/Footer';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Do - Form</title>
      </Helmet>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
    </OverviewWrapper>
  );
}

export default Overview;
