import {
  // Box,
  Button,
  Container,
  Grid,
  // Typography,
  // styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';



function Hero() {
  const { t } = useTranslation();


  return (
    <Container maxWidth="lg">
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={6} pr={{ xs: 0, md: 3 }}>
          
          <Button
            component={RouterLink}
            to="/extended-sidebar/management/forms/assigment"
            size="large"
            variant="contained"
          >
            {t('Browse Live Preview')}
          </Button>
          
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
