import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { DashboardLayout } from '../components/dashboard-layout';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom'
import { tr } from 'date-fns/locale';

import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];






const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      axios.get('https://iwadeli.herokuapp.com/api/getUsers').then(
        res => 
          {
            console.log(res.data)
            setData(res.data)
          }
          
        
      )
      .catch(err =>
        console.log(err)
      )
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
              <h4>Client Iwa</h4>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nom</StyledTableCell>
            <StyledTableCell align="right">Prenom</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <StyledTableRow key={data.id}>
              <StyledTableCell component="th" scope="row">
                {data.name}
              </StyledTableCell>
              <StyledTableCell align="right">{data.prenom}</StyledTableCell>
              <StyledTableCell align="right">{data.contact}</StyledTableCell>
              <StyledTableCell align="right">{data.role}</StyledTableCell>
              <StyledTableCell align="right">{data.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
              </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </Box>

    </>

  )
}









Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
