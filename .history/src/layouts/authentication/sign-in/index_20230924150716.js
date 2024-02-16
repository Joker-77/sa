/* eslint-disable */
import { useState, useEffect } from "react";

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useAuthState } from "context/Auth";
import { loginUser } from "context/Auth";
import { useAuthDispatch } from "context/Auth";
import { useNavigate   } from "react-router-dom";
import { toast } from "react-toastify";
function Basic() {
  const dispatch = useAuthDispatch();
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || useAuthState();
  if (userDetails)  {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    return <Navigate to="/dashboard" />;
  }
  if (userDetails.errorMessage){
    toast.error(userDetails.errorMessage?.response?.data?.message)
  }
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] =  useState("");
  const [password, setPassword] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const submitUser = async () => {
    await loginUser(dispatch, email, password); 
  }
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}></Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput onChange={(event) => setEmail(event.target.value)} type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput onChange={(event) => setPassword(event.target.value)} type="password" label="Password" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={submitUser} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
