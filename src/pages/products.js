import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { DashboardLayout } from '../components/dashboard-layout';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { Link } from 'react-router-dom'
import { tr } from 'date-fns/locale';


function createData(name, calories, fat, carbs, protein, action) {
  return { name, calories, fat, carbs, protein, action };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



const Page = () => {

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    let isMounted = true;
    document.title = "voir commandes";
    axios.get('https://iwadeli.herokuapp.com/api/listCopie').then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setOrders(res.data.orderCopie);
          setLoading(false);
        }
      }
    })
    return () => {
      isMounted = false
    };
  }, [])
  return (
    <>
      <Head>
        <title>
          Iwa
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >

        <div className='container px-4 mt-3'>
          <div className='card'>
            <div className='card-header'>
              <h4>Commandes Iwa</h4>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nature commande</th>
                      <th>Nom client</th>
                      <th>Point depart</th>
                      <th>Point arriver</th>
                      <th>Prix commandes</th>
                      <th>Numéro recepteur</th>
                      <th>Numéro destinataire</th>
                      <th>Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      loading ? <h1>Chargement.........</h1> : orderCopie.map((item) => {
                        <tr key={item.id}>
                          <td>{item.nature}</td>
                          <td>{item.id_user}</td>
                          <td>{item.lieudedepart}</td>
                          <td>{item.lieudelivraison}</td>
                          <td>{item.montant}</td>
                          <td>{item.contactdudestinataire}</td>
                          <td>{item.contact}</td>
                          <td>{item.details}</td>
                          <td>
                            <link to=''> Voir</link>
                          </td>
                        </tr>

                      })

                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Box>

    </>

  )
}




{/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Action&nbsp;(X)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.action}</TableCell>
              <TableCell align="right">
              <IconButton aria-label="delete" size="small">
                 <DeleteIcon fontSize="inherit" />
              </IconButton>
           <IconButton aria-label="delete" size="small">
           <DeleteIcon fontSize="small" />
           </IconButton>
        <IconButton aria-label="delete" size="small">
        <DeleteIcon fontSize='small' />
          </IconButton>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}







Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
