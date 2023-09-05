import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useMutation, gql } from "@apollo/client";
import {Alert} from '@mui/material'
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const ADD_USER = gql`
mutation AddUser($name: String!, $email: String!, $password: String!, $address: String!, $country: String!, $zipCode: String!){
  addUser(name: $name, email: $email, password: $password, address: $address, country: $country, zip_code: $zipCode)
}
`;

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function AddUser() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
    country: "",
    zip_code: "",
  });


  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [message, setMessage] = React.useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    if(!EMAIL_REGEX.test(formData.email)){
      setMessage("Invalid Email address");
      return;
    }
    try {
      await register({
       variables:{
        name:formData.name,
        email:formData.email,
        password:formData.password,
        address: formData.address,
        country: formData.country,
        zipCode: formData.zip_code
       }
      });
      setMessage("Successfully Registered!");
      
    } catch (error) {
      console.error("Error Detecting at: ", error);
    }
  };

  const [register, { error }] = useMutation(ADD_USER);
  if(error){
    console.error(error);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "lightskyblue" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              type="text"
              name="name"
              id="name"
              required
              fullWidth
              autoComplete="name"
              value={formData.name}
              onChange={inputChange}
              label="UserName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={formData.email}
              onChange={inputChange}
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={formData.password}
              onChange={inputChange}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              type="text"
              name="address"
              id="address"
              fullWidth
              required
              value={formData.address}
              onChange={inputChange}
              label="Address"
              autoComplete="address"
              margin="normal"
            />
            <TextField
              type="text"
              name="country"
              id="country"
              fullWidth
              required
              value={formData.country}
              onChange={inputChange}
              autoComplete="country"
              margin="normal"
              label="Country"
            />
            <TextField
              type="number"
              name="zip_code"
              id="zip_code"
              value={formData.zip_code}
              onChange={inputChange}
              fullWidth
              required
              margin="normal"
              label="ZIP_CODE"
            />
            {message && (
              <Alert
                severity={
                  message.includes("Successfully") ? "success" : "error"
                }
                sx={{ mt: 2 }}
              >
                {message}
              </Alert>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "lightskyblue" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
