import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from 'react-cookie';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { login } from "../__mocks__/login";


const Login = () => {

    const [cookies, setCookie] = useCookies(['authToken']);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      contact: "",
      password: "",
    },
    validationSchema: Yup.object({
      contact: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .max(255)
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .max(255)
        .required("First name is required"),
    }),
    onSubmit: (values) => {
      login(values).then((res) => {
        console.log(res)
        if (res.status === 200) {
            setCookie('authToken', res.data?.access_token, { path: '/' });
          Router.push("/").catch(console.error);
        }else{
            Router.push("/404").catch(console.error);
        }
      });
    },
  });

  return (
    <>
      <Head>
        <title>Inscription</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Connectez vous a votre compte
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Utiliser Téléphone et mot de passe
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.contact && formik.errors.contact)}
              fullWidth
              helperText={formik.touched.contact && formik.errors.contact}
              label="Phone Number"
              margin="normal"
              name="contact"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.contact}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              variant="outlined"
            />

            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Inscrivez-vous maintenant
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
            j'ai un compte?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                Connexion 
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
