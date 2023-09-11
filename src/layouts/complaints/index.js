// @mui material components
/* eslint-disable */
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import {
  useMaterialUIController,
} from "context";
import { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ComplaintsService from "services/ComplaintsService"
import { toast } from 'react-toastify';

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [rows, setFiltered] = useState([]);
  const [controller, dispatch] = useMaterialUIController();
  const {
    direction,
  } = controller;
  const columns = [
    {
      Header: direction == "ltr" ? "Id" : "المعرّف",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.id}
    </MDTypography> },
      width: 20,
      dataKey: 'id',
    },
    {
      Header:  direction == "ltr" ? "Name":"الاسم",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.name}
    </MDTypography> },
      width: 50,
      dataKey: 'name',
    },
    {
      Header: direction == "ltr" ? "Email" : "عنوان الإيميل",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.email}
    </MDTypography> },
      width: 50,
      dataKey: 'email',
    },
    {
      Header: direction == "ltr" ? "Complaint" : "الشكوى",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.message}
    </MDTypography> },
      width: 50,
      dataKey: 'message',
    },
    {
      Header: direction == "ltr" ? "User" : "المستخدم",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.user?.name}
    </MDTypography> },
      width: 50,
      dataKey: 'message',
    },
    {
      Header: direction == "ltr" ? "Actions" : "إعدادات",
      accessor: (d) => 
      { 
        return <> 
                  <MDButton  onClick={() => handleClickOpen(1, d.id)} color="warning" style={{ backgroundColor: "red" }}>
                    {direction == 'rtl' ? "حذف" : "Delete"}
                  </MDButton> </>
      },
      width: 50,
    }
  ];
  const getComplaints = () => {
    ComplaintsService.getAllComplaints()
    .then(resp => {
      console.log(resp)
      setFiltered(resp.data);
      setComplaints(resp.data);
    })
  }
  useEffect(() => {
    getComplaints()
  }, [])
  // Damage Dialog
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const handleClickOpen = (number, id) => {
    setId(id)
    direction == "rtl" ? setMessage("هل تريد حذف هذا العنصر؟") : setMessage("Are you sure you want to delete this item")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = () => {
      ComplaintsService.deleteComplaint(id)
      .then(resp => {
        toast.success("Complaint deleted succesfully")
        getComplaints()
        setOpen(false)
      })
      .catch(error => {
        toast.error(error?.response?.data?.message)
      })
  }
  const DamageDialog = (props) => {
    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { message }
        </DialogTitle>
        <DialogActions>
          <MDButton  color="primary" onClick={handleAction} autoFocus>
          { direction == "ltr" ? "Yes" : "نعم" }
          </MDButton>
          <MDButton color="red" onClick={handleClose}>
          { direction == "ltr" ? "No" : "لا" }
          </MDButton>
        </DialogActions>
      </Dialog>
  }

  // custom pagination

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event,
    newPage,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [search, setSearch] = useState();
  const onSearchChange = useAsyncDebounce((value) => {
    setSearch(value)
    if(!!value)
    {
      let _searched = complaints.filter(e => e.en_name.toLowerCase().includes(value) 
      || e.ar_name.toLowerCase().includes(value)
      || e.brand.toLowerCase().includes(value)
      || e.unit_price.toString().toLowerCase().includes(value)
      || e.entity.toString().toLowerCase().includes(value)
      || e.selling_price.toString().toLowerCase().includes(value));
      setFiltered(_searched)
    }
    else 
    setFiltered(complaints)
  }, 100);
  //
  return (
    <DashboardLayout>
      <DashboardNavbar name={direction == 'rtl' ? "الشكاوى" : "Complaints"} />
        <MDInput
          style={{ marginTop: "1em" }}
          placeholder={direction == 'rtl' ? "بحث" : "Search"}
          value={search}
          size="small"
          fullWidth
          onChange={({ currentTarget }) => {
            onSearchChange(currentTarget.value);
          }}
        />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
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
                  {direction == 'rtl' ? "جدول الشكاوى" : "Complaints Table"}
                  </MDTypography>
                </MDBox>
                {rows != null && rows.length > 0 &&  
                 <DataTable
                    type='coupons'
                    table={{ columns, rows }}
                    isSorted={true}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                    canSearch={true}
                  /> 
                }
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      <DamageDialog />
    </DashboardLayout>
  );
}

export default Complaints;
