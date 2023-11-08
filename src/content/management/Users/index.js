import { useState, useEffect, useCallback } from 'react';


import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
// import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';
import useRefMounted from 'src/hooks/useRefMounted';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Results from './Results';
import customAxios from 'src/utils/customAxios';

function ManagementUsers() {
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await customAxios.get('/user/list');

      if (isMountedRef.current) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

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

  
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Helmet>
        <title>Lista de Usuarios</title>
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
          <Results users={users} updatedUserList={updateUserList} removeUser={removeUser} />
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementUsers;
