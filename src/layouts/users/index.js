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
import UsersService from "services/UsersService";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import "layouts/users/index.css";
import { CreateUser } from "./createUser";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { TextField, MenuItem } from "@mui/material";

function Users() {
  const [products, setUsers] = useState([]);
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
      Header:  direction == "ltr" ? "Name":"الاسم",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.name}
    </MDTypography> },
      width: 50,
      dataKey: 'Name',
    },
    {
      Header:  direction == "ltr" ? "Email Address":"عنوان البريد الإلكتروني",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.email}
    </MDTypography> },
      width: 50,
      dataKey: 'email',
    },
    {
      Header: direction == "ltr" ? "Phone" : "رقم الهاتف",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.phone}
    </MDTypography> },
      width: 50,
      dataKey: 'phone',
    },
    {
      Header: direction == "ltr" ? "Role" : "الصفة الوظيفية",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.role?.name}
    </MDTypography> },
      width: 50,
      dataKey: 'role',
    },
    {
      Header: direction == "ltr" ? "Actions" : "إعدادات",
      accessor: (d) => 
      { 
        return <>  <MDButton onClick={() => showUser(d)} style={{ margin: '0 5px 0 5px', backgroundColor: "lightblue" }}>
                        {direction == 'rtl' ? "تعديل" : "Edit"}
                  </MDButton>  
                  <MDButton  onClick={() => handleClickOpen(1, d.id)} color="warning" style={{ backgroundColor: "red" }}>
                    {direction == 'rtl' ? "حذف" : "Edit"}
                  </MDButton> </>
      },
      width: 50,
    }
  ];
  const getUsers = (type) => {
    setFiltered([]);
    setUsers([]);
   if (type == 'users') 
      UsersService.getAllUsers()
      .then(resp => {
        console.log(resp)
        setFiltered(resp);
        setUsers(resp);
      })
    if (type == 'client') 
      UsersService.getAllClients()
      .then(resp => {
        console.log(resp)
        setFiltered(resp.data);
        setUsers(resp.data);
      })
    if (type == 'marketers') 
      UsersService.getAllMarketers()
      .then(resp => {
        console.log(resp)
        setFiltered(resp.data);
        setUsers(resp.data);
      })
  
  }
  useEffect(() => {
    getUsers('users')
  }, [])
  // Damage Dialog
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const handleClickOpen = (number, id) => {
    setId(id)
    setMessage("هل تريد حذف هذا العنصر؟")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = () => {
      UsersService.deleteUser(id)
      .then(resp => {
        toast.success("User deleted succesfully")
        getUsers()
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
            نعم
          </MDButton>
          <MDButton color="red" onClick={handleClose}>لا</MDButton>
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
      let _searched = products.filter(e => e.name.toLowerCase().includes(value) 
      || e.phone.toLowerCase().includes(value)
      || e.email.toLowerCase().includes(value));
      setFiltered(_searched)
    }
    else 
    setFiltered(products)
  }, 100);
  //
  const [show, setShow] = useState(false);
  const [createNew, setCreate] = useState(false);
  const [_user, setUser] = useState(null);
  const showUser = (d) => {
    setShow(true);
    setUser(d);
    setCreate(false);
  }
  const addNew = () => {
    setCreate(true);
    setShow(true);
  } 
  const back = () => {
    setCreate(false)
    setShow(false)
    setUser(null)
  }
  const types = 
  [
    'users', 'marketers', 'client'
  ]
  const [type, setType] = useState('users');
  const getByType = (type) => {
    setType(type);
    getUsers(type);
  }
  return (
    <DashboardLayout>
      {
        !show && <> <DashboardNavbar name={direction == 'rtl' ? "المستخدمون" : "Users"} />
        <MDButton onClick={() => addNew()} color="primary">
        {direction == 'rtl' ? "إضافة مستخدم" : "Create User"}
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
        <Grid item xs={12} md={10}>
                <TextField
                    style={{ height: "3em", marginTop: "1em" }}
                    label={direction == "ltr" ? "User Type" : "نوع المستخدم"}
                    variant="outlined"
                    margin="dense"
                    value={type}
                    fullWidth
                    select
                    onChange={(e) => getByType(e.target.value)}
                >
                    {types != null && types.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                        {cat}
                        </MenuItem>
                    ))}
                </TextField>
          </Grid>
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
                  {direction == 'rtl' ? "جدول المستخدمون" : "Users Table"}
                  </MDTypography>
                </MDBox>
                {rows != null && rows.length > 0 &&  
                 <DataTable
                    type='users'
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
         <DashboardNavbar name={direction == 'rtl' ? "إضافة أو تعديل مستخدم" : "Create or Edit User"} />
         <CreateUser isCreate={createNew} product={_user} backToPrevious={() => back()} />
        </>
      }
      <DamageDialog />
    </DashboardLayout>
  );
}

export default Users;
