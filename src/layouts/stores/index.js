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
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
  setDirection,
} from "context";
import { useEffect, useState } from "react";
import StoresService from "services/StoresService";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { CreateStore } from "./createStore";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

function Stores() {
  const [categories, setstores] = useState([]);
  const [rows, setFiltered] = useState([]);
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
  const backendUrl = "https://back.trendfuture.shop";
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
      Header:  direction == "ltr" ? "English Name":"الاسم بالإنكليزي",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.en_name}
    </MDTypography> },
      width: 50,
      dataKey: 'en_name',
    },
    {
      Header:  direction == "ltr" ? "Arabic Name":"الاسم بالعربية",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.ar_name}
    </MDTypography> },
      width: 50,
      dataKey: 'ar_name',
    },
    {
      Header:  direction == "ltr" ? "English Adress":"العنوان بالإنكليزية",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.en_address}
    </MDTypography> },
      width: 50,
      dataKey: 'en_address',
    },
    {
      Header:  direction == "ltr" ? "Arabic Adress":"العنوان بالعربية",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.ar_address}
    </MDTypography> },
      width: 50,
      dataKey: 'ar_address',
    },
    {
      Header:  direction == "ltr" ? "Email Adress":"البريد الإلكتروني",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.email}
    </MDTypography> },
      width: 50,
      dataKey: 'email',
    },  
    {
      Header:  direction == "ltr" ? "Phone":"رقم الهاتف",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.phone}
    </MDTypography> },
      width: 50,
      dataKey: 'phone',
    },   
    {
      Header: direction == "ltr" ? "Actions" : "إعدادات",
      accessor: (d) => 
      { 
        return <>  <MDButton onClick={() => showstore(d)} style={{ margin: '0 5px 0 5px', backgroundColor: "lightblue" }}>
                        {direction == 'rtl' ? "تعديل" : "Edit"}
                  </MDButton>  
                  <MDButton onClick={() => handleClickOpen(d.id)} color="warning" style={{ backgroundColor: "red" }}>
                  {direction == 'rtl' ? "حذف" : "Delete"}
                  </MDButton> </>
      },
      width: 50,
    }
  ];
  const getStores = () => {
    StoresService.getAllStores()
    .then(resp => {
      console.log(resp)
      setFiltered(resp.data);
      setstores(resp.data);
    })
  }
  useEffect(() => {
    getStores()
  }, [])
  

  // custom pagination

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  // Delete

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const handleClickOpen = (id) => {
    setId(id)
    setMessage("هل تريد حذف هذا العنصر؟")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = () => {
      StoresService.deleteStore(id)
      .then(resp => {
        toast.success("Store deleted succesfully")
        getStores()
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
      let _searched = categories.filter(e.name.includes(value)
      || e.name_a.includes(value));
      setFiltered(_searched)
    }
    else 
    setFiltered(categories)
  }, 100);
  //
  const [show, setShow] = useState(false);
  const [createNew, setCreate] = useState(false);
  const [_store, setstore] = useState(null);
  const showstore = (d) => {
    setShow(true);
    setstore(d);
    setCreate(false);
  }
  const addNew = () => {
    setCreate(true);
    setShow(true);
  } 
  const back = () => {
    setCreate(false)
    setShow(false)
    setstore(null)
  }
  return (
    <DashboardLayout>
      {
        !show && <> <DashboardNavbar name={direction == 'rtl' ? "المتاجر" : "Stores"} />
        <MDButton onClick={() => addNew()} color="primary">
        {direction == 'rtl' ? "إضافة متجر" : "Create Store"}
        </MDButton>
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
                  {direction == 'rtl' ? "جدول المتاجر" : "Stores Table"}
                  </MDTypography>
                </MDBox>
                {rows != null && rows.length > 0 &&  
                 <DataTable
                    type='stores'
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
        </MDBox> </>
      }
      {
        show && 
        <>
         <DashboardNavbar name={direction == 'rtl' ? "إضافة أو تعديل متجر" : "Create or Edit Store"} />
         <CreateStore isCreate={createNew} store={_store} backToPrevious={() => back()} />
        </>
      }
      <DamageDialog />
    </DashboardLayout>
  );
}

export default Stores;
