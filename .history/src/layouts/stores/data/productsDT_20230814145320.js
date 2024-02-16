/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

export default function data() {
  const Author = ({ id, en_name, ar_name, image, unit_price, selling_price, entity, brand  }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={en_name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  return {
    columns: [
      { Header: "id", accessor: "author", /* width: "45%", */ align: "left" },
      { Header: "en_name", accessor: "function", align: "left" },
      { Header: "ar_name", accessor: "function", align: "left" },
      { Header: "unit_price", accessor: "status", align: "center" },
      { Header: "selling_price", accessor: "employed", align: "center" },
      { Header: "quantity", accessor: "employed", align: "center" },
      { Header: "image", accessor: "employed", align: "center" },
      { Header: "brand", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
  }
}