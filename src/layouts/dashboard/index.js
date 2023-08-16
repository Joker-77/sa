/* eslint-disable */
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
function Dashboard() {
  const [controller, dispatch] = useMaterialUIController();
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
  useEffect(() => {
   DashboardService.getDashboardData()
   .then(resp => {
     console.log("resp", resp.data)
     setData(resp.data);
   })
  }, []);
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
        </MDBox>        
    </DashboardLayout>
  );
}
export default Dashboard;
