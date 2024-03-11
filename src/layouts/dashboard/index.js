/* eslint-disable */
import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DataTable from "examples/Tables/DataTable";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useState, useEffect } from "react";
import { DashboardService } from "services/DashboardService";
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
  setDirection,
} from "context";
import StudentsService from "services/StudentsService";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useAuthDispatch } from "context/Auth";
import { useAuthState } from "context/Auth";
function Dashboard() {
  const [controller, dispatch] = useMaterialUIController();
  const userDetails = useAuthState();

  const {
    openConfigurator,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    direction,
  } = controller;
  const [data, setData] = useState(null);
  const [page, setPage] = React.useState(0);
  const [products, setProducts] = useState([]);
  const [rows, setFiltered] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {}, []);

  const backendUrl = "https://back.RUSA.shop";
  const columns = [
    {
      Header: direction == "ltr" ? "Id" : "المعرّف",
      accessor: (d) => {
        return (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {d.id}
          </MDTypography>
        );
      },
      width: 20,
      dataKey: "id",
    },
    {
      Header: direction == "ltr" ? "English Name" : "الاسم بالإنكليزي",
      accessor: (d) => {
        return (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {d.en_name}
          </MDTypography>
        );
      },
      width: 50,
      dataKey: "en_name",
    },
    {
      Header: direction == "ltr" ? "Arabic Name" : "الاسم بالعربي",
      accessor: (d) => {
        return (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {d.ar_name}
          </MDTypography>
        );
      },
      width: 50,
      dataKey: "ar_name",
    },
    {
      Header: direction == "ltr" ? "Unit Price" : "سعر الواحدة",
      accessor: (d) => {
        return (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {d.unit_price}
          </MDTypography>
        );
      },
      width: 50,
      dataKey: "unit_price",
    },
    {
      Header: direction == "ltr" ? "Selling Price" : "سعر المبيع ($)",
      accessor: (d) => {
        return (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {d.selling_price}
          </MDTypography>
        );
      },
      width: 50,
      dataKey: "selling_price",
    },
    {
      Header: direction == "ltr" ? "Quantity" : "الكمية",
      accessor: (d) => {
        return (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {d.entity}
          </MDTypography>
        );
      },
      width: 50,
      dataKey: "entity",
    },
    {
      Header: direction == "ltr" ? "Brand" : "النوع",
      accessor: (d) => {
        return (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {d.brand}
          </MDTypography>
        );
      },
      width: 50,
      dataKey: "brand",
    },
    {
      Header: direction == "ltr" ? "Image" : "الصورة",
      accessor: (d) => {
        return <img src={`${backendUrl}/upload/${d.image}`} width="50" height="50" />;
      },
      width: 50,
      dataKey: "brand",
    },
  ];
  // const getProducts = () => {
  //   ProductsService.getAllProducts().then((resp) => {
  //     console.log(resp);
  //     setFiltered(resp.data);
  //     setProducts(resp.data);
  //   });
  // };
  useEffect(() => {}, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title={direction == "ltr" ? "Today's Revenue" : "إيرادات اليوم"}
                count={data?.today_revenue}
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title={direction == "ltr" ? "Total Orders" : "عدد الطلبات الكلّي"}
                count={data?.total_order}
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title={direction == "ltr" ? "Total Revenue" : "إجمالي الإيرادات"}
                count={data?.total_revenue}
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title={direction == "ltr" ? "Total Stores" : "عدد المتاجر"}
                count={data?.total_stores}
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container mt={2} spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  {direction == "rtl"
                    ? "جدول المنتجات الأكثر تقييماً"
                    : "Most Rated Products Table"}
                </MDTypography>
              </MDBox>
              {rows != null && rows.length > 0 && (
                <DataTable
                  type="products"
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                  canSearch={true}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default Dashboard;
