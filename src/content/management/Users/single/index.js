import { useState, useCallback, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';


import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import useRefMounted from 'src/hooks/useRefMounted';



import ProfileCover from './ProfileCover';
import customAxios from 'src/utils/customAxios';



function ManagementUsersView() {
  const isMountedRef = useRefMounted();
  const [user, setUser] = useState(null);
  const { _id } = useParams();

  const getUser = useCallback(async () => {
    try {
      const response = await customAxios.get('/user/find', {
        params: {
          _id
        }
      });
      if (isMountedRef.current) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error(err);
    }
  }, [_id, isMountedRef]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{user.nombre} - Perfil</title>
      </Helmet>
      <Box
        sx={{
          mt: 3
        }}
      >
        <Grid
          sx={{
            px: 4
          }}
          container
          direction="row"
          justifyContent="left"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <ProfileCover user={user} />
          </Grid>
        </Grid>
      </Box>

    </>
  );
}

export default ManagementUsersView;
