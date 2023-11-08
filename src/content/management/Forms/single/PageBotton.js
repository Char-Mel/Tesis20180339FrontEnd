import { useTranslation } from 'react-i18next';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  Box,
  Button,
} from '@mui/material';

function PageBotton() {
  const { t } = useTranslation();


  const handleCreateProjectOpen = () => {
    window.history.back();
  };


  return (
    <>
      <Box mt={2} mr={3} display={"flex"} flexDirection={"row-reverse"} >
        <Box item>
          <Button 
            onClick={handleCreateProjectOpen}
            variant="contained"
            color="secondary"
          >
            {t('Volver')}
          </Button>
        </Box>
      </Box>

    </>
  );
}

export default PageBotton;
