// import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  // Link,
  // Tooltip,
  Typography,
  Container,
  // Alert,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import useAuth from 'src/hooks/useAuth';
import Auth0Login from '../LoginAuth0';
import FirebaseAuthLogin from '../LoginFirebaseAuth';
import JWTLogin from '../LoginJWT';
import AmplifyLogin from '../LoginAmplify';

import { useTranslation } from 'react-i18next';


const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
  @media (min-width: ${theme.breakpoints.values.md}px) {
    padding: 0 0 0 440px;
  }
  width: 100%;
  display: flex;
  align-items: center;
`
);


function LoginCover() {
  const { method } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Iniciar sesión</title>
      </Helmet>
      <Content>
        <MainContent>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            maxWidth="sm"
          >
            <Card
              sx={{
                p: 4,
                my: 4,                
                textAlign: 'center' // Centra el contenido dentro del Card
              }}
            >
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Iniciar sesión')}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3
                  }}
                >
                  {t('Completar los campos para inciar sesión')}
                </Typography>
              </Box>
              {method === 'Auth0' && <Auth0Login />}
              {method === 'FirebaseAuth' && <FirebaseAuthLogin />}
              {method === 'JWT' && <JWTLogin />}
              {method === 'Amplify' && <AmplifyLogin />}
            </Card>
          </Container>
        </MainContent>
      </Content>
    </>
  );
}

export default LoginCover;
