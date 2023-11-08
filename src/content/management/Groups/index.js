import { useState, useEffect, useCallback } from 'react';
import customAxios from 'src/utils/customAxios';


import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
// import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';
import useRefMounted from 'src/hooks/useRefMounted';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Results from './Results';

function ManagementGroups() {
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);
  const accessToken = window.localStorage.getItem('accessToken');

  const getUsers = useCallback(async () => {
    try {
      const response = await customAxios.get('/group/listToken',{
        headers: {
          'Authorization': `Bearer ${accessToken}`
      }
      });

      if (isMountedRef.current) {
        setUsers(response.data.groupsWithQuantity);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  const updateUserList = (newUser) => {
    const userIndex = users.findIndex(user => user._id === newUser._id);

      if (userIndex !== -1) {
    // Si el usuario ya existe, actualizarlo
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[userIndex] = newUser;
      return updatedUsers;
    });
  } else {
    // Si el usuario no existe, agregarlo
    setUsers(prevUsers => [...prevUsers, newUser]);
  }
  };

  const removeUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
  };


  return (
    <>
      <Helmet>
        <title>Lista de Grupos</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader updateUserList={updateUserList} />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Results users={users} removeUser={removeUser} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementGroups;
