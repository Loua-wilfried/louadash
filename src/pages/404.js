import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/Clients';
import {
  Avatar,
 
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
  PerfectScrollbar,
  TextField
} from '@mui/material';


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



  
const Page = () => (
 


  useEffect(() => {
    let isMounted = true;
    document.title = "voir commandes";
    axios.get('https://iwadeli.herokuapp.com/api/getUser').then(res => {
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
  }, []),
  <>
    <Head>
      <title>
        Livreur iwa
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
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
                      loading ? <h1>Chargement.........</h1> : user.map((item) => {
                        <tr key={item.id}>
                          <td>{item.photo}</td>
                          <td>{item.nom}</td>
                          <td>{item.prenom}</td>
                         
                          <td>
                            <link to='https://iwadeli.herokuapp.com/api/list/${item.id}' className='btn btn-primary btn-sm flloat-end'> Voir</link>
                          </td>
                        </tr>

                      })

                    }
                  </tbody>
                </table>
        </Box>
      </PerfectScrollbar>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
