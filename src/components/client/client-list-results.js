import React from "react";
import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useFormik } from "formik";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Modal,
  TextField
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { SettingsApplications } from "@mui/icons-material";
import { id } from "date-fns/locale";


export const utilisateur = ({ customers, ...rest }) => {
  const [modalOpen, setModalOpen] = useState(false);


  
 const handleClose = ()=>{
  setModalOpen(false)
 }

 const handleOpen = ()=>{
  setModalOpen(true)
 }

 const handleFermer = ()=>{
  setModalOpen(false)
 }

 const handleOuvert = ()=>{
  setModalOpen(true)
 }
// recuperation des info des clients
   const [loading, setLoading] = useState(true);
  const [client, setClient] = useState([]);


  useEffect(() => {
    let isMounted = true;
    document.title = "voir client";
    axios.get('https://iwadeli.herokuapp.com/api/getUsers').then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setOrders(res.data.user);
          setLoading(false);
        }
      }
    })
    return () => {
      isMounted = false
    };
  }, [])

 
  return (

    
    <Card >
      <Button onClick={handleOpen}
        color="primary"
        size="large"
        type="submit"
        variant="contained"
      >
        Ajouter un livreur
      </Button>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Photo
                </TableCell>
                <TableCell>
                  Nom
                </TableCell>
                <TableCell>
                  Prenom
                </TableCell>
                <TableCell>
                  Numero
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? <h1>Chargement.........</h1> : user.map((item)  => {

            
                <TableRow
                  hover
                  key={user.id}
                  selected={id.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={id.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {user.photo}
                  </TableCell>
                  <TableCell>
                  {user.nom}
                  </TableCell>
                  <TableCell>
                  {user.prenom}
                  </TableCell>
                  <TableCell>
                  {user.contact}
                  </TableCell>

                  <TableCell>
                    <Button
                      color="primary"
                      variant="outlined"
                     //onClick={()=>selectUser(customer.id)}
                      onClick={handleOuvert}
                    >
                      Modif
                    </Button>

                    <Button onClick={()=>deleteUser(customer.id)} variant="outlined" color="error">
                      Suppr
                    </Button>
                  </TableCell>




                </TableRow>
                  })}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      


<Modal
  open={modalOpen}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  }}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      AJouter les livreus Iwa
    </Typography>

            <form>
            <Box sx={{ my: 4 }}>

            <TextField
              margin="normal"
              value={photo}
              variant="outlined"
              type="file"
              onChange={(e)=>{setPhoto(e.target.value)}}
            />
            <TextField
              label="Nom du livreur"
              value={name}
              margin="normal"
              
              variant="outlined"
              onChange={(e)=>{setName(e.target.value)}}
            />
            <TextField
              label="prenom du livreur"
              value={lastname}
              margin="normal"
              

              variant="outlined"
              onChange={(e)=>{setLastname(e.target.value)}}
            />
            <TextField
              label="numero du livreur"
              value={numero}
              margin="normal"
              
              variant="outlined"
              onChange={(e)=>{setNumero(e.target.value)}}
            />
            {error && !numero && <span>Le numéro n'est pas juste</span>}
               
            </Box>

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={addLivreur}
              >
                Enregister
              </Button>
            </Box>
            </form>
  </Box>
</Modal>

    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
}
