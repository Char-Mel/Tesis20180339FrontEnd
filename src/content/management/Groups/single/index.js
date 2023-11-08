import { useState, useCallback, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';


import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import useRefMounted from 'src/hooks/useRefMounted';

import customAxios from 'src/utils/customAxios';


import PageHeaderGroupSingle from './PageHeaderGroupSingle';
import Results from './Results';


function ManagementGroupView() {
  
  const isMountedRef = useRefMounted();
  const [group, setGroup] = useState(null);
  const [groupParticipants, setGroupParticipants] = useState([]);
  const { _id } = useParams();

  const getUser = useCallback(async () => {
    try {
      const response = await customAxios.get('/group/find', {
        params: {
          _id
        }
      });
      if (isMountedRef.current) {
    
        setGroup(response.data.group);
        setGroupParticipants(response.data.group.participants)
        
      }
    } catch (err) {
      console.error(err);
    }
  }, [_id, isMountedRef]);

  useEffect(() => {
    getUser();
    
  }, [getUser]);

  if (!group) {
    return null;
  }


const updateUserList =(participants) =>{
  setGroupParticipants([]);
setGroupParticipants([...participants]);
}


const removeParticipant = (_id) => {
  // Filtramos los participantes para mantener solo aquellos con un _id diferente al que queremos eliminar
  // console.log(_id)
  // console.log(groupParticipants)

  const updatedParticipants = groupParticipants.filter(participant => participant._id._id !== _id);
  
  // console.log(updatedParticipants)
  setGroupParticipants(updatedParticipants);
}


  return (
    <>
      <Helmet>
        <title>Grupo - {group.nombre}</title>
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
          <PageHeaderGroupSingle group={group} updateUserList={updateUserList} />
          </Grid>

          <Grid item xs={12}>
            <Results groups={groupParticipants} groupsID={group._id} removeParticipant={removeParticipant}/>
          </Grid>

        </Grid>
      </Box>

    </>
  );
}

export default ManagementGroupView;
