import React from "react";
import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useFormik } from "formik";
import UserCreate from './UserCreate';
import Users from './Users';
import UserUpdate from './UserUpdate';

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


export const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  
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

 // supprimer un livreur
 useEffect(() => {
  getUser();
 }, [])

 function getUser(){
  fetch("lien api pour supprimer un livreur").then((result)=>{
    result.json().then((resp)=>{
       setUser(resp)
    })
  })
 }

 function deleteUser(id){
    fetch("lien api pour supprimer un livreur/${id}",{
      method: 'DELETE'
    }).then((result)=>{
      result.json().then((resp)=>{
         console.log(resp)
         getUser();
      })
    })
 }
// supprimer un livreur
 // modifier un livreur 
  function selectUser(id){
     let customers=customers[id-1];
     setName(customers.name)
     setLastname(customers.lastname)
     setPhone(customers.phone)
     setCustomerId(customers.id)
  }

 //modifier un livreur

 //upddateUser

 function updateUser(){
  let item= {name, lastname, phone, customersId}
  console.warn("item", item)
  fetch("lien api pour supprimer un livreur/${customerId}",{
    method: 'PUT',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(item)
  }).then((result)=>{
    result.json().then((resp)=>{
       console.log(resp)
       getUser();
    })
  })
 }
  //upddateUser

  // ajouter un livreur
    const[photo, setPhoto] = React.useState('')
    const[name, setName] = React.useState('')
    const[lastname, setLastname] = React.useState('')
    const[numero, setNumero] = React.useState('')
    const [error, setError] = React.useState(false)
  
    const addLivreur = async()=>{
    if(!photo || !name || !lastname || !numero ){
      setError(true)
      return false
    }
      
      console.warn(photo, name, lastname, numero)

      const userId = JSON.parse(localStorage.getItem('user')).id-livreurs;
      const result = fetch("https://iwadeli.herokuapp.com/api/addLivreur",{
        method:'POST'.
        body.JSON.stringify({photo, name, lastname, numero}),
        headers:{
          "Content-Type":"application/json"
        }
      })

      result= await result.json();
      console.warn(result)
    }
  // ajouter un livreur
  //liste des livreurs
  const[livreur, setLivreur] = React.useState([]);
  useEffect(()=>{
    getLivreur()
  },[])

  const getLivreur = async () =>{
    let result = await fetch("https://iwadeli.herokuapp.com/api/listLivreur");
    result = await result.json();
    setLivreur(livreur)
  }
  console.warn("livreur", livreur);
  //liste des livreurs
  return (
    <Card {...rest}>
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
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.name}
                  </TableCell>
                  <TableCell>
                  {customer.lastname}
                  </TableCell>
                  <TableCell>
                    {customer.phone}

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
              ))}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />


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
