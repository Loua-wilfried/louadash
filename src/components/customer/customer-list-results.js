import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useFormik } from "formik";
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
                    >
                      Modif
                    </Button>

                    <Button variant="outlined" color="error">
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
      AJouter les livreus d'Iwa
    </Typography>

            <form>
            <Box sx={{ my: 4 }}>

            <TextField
              
              margin="normal"
              name="image"
              variant="outlined"
              type="file"
            />
            <TextField
              label="Nom du livreur"
              margin="normal"
              name="nom"
              variant="outlined"
            />
            <TextField
              label="prenom du livreur"
              margin="normal"
              name="prenom"
              variant="outlined"
            />
            <TextField
              label="numero du livreur"
              margin="normal"
              name="numero"
              variant="outlined"
            />
               
            </Box>

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
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
};
