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
import CategoriesService from "services/CategoriesService";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { CreateCategory } from "./createCategory";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

function Categories() {
  const [categories, setcategorys] = useState([]);
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
      {d.name}
    </MDTypography> },
      width: 50,
      dataKey: 'name',
    },    
    {
      Header: direction == "ltr" ? "Image" : "الصورة",
      accessor: (d) => 
      { 
        return <img src={`${backendUrl}/upload/${d.image}`} width="50" height="50" /> 
      },
      width: 50,
      dataKey: 'brand',
    },
    {
      Header: direction == "ltr" ? "Actions" : "إعدادات",
      accessor: (d) => 
      { 
        return <>  <MDButton onClick={() => showcategory(d)} style={{ margin: '0 5px 0 5px', backgroundColor: "lightblue" }}>
                        {direction == 'rtl' ? "تعديل" : "Edit"}
                  </MDButton>  
                  <MDButton onClick={() => handleClickOpen(d.id)} color="warning" style={{ backgroundColor: "red" }}>
                   {direction == 'rtl' ? "حذف" : "Delete"}
                  </MDButton> </>
      },
      width: 50,
    }
  ];
  const getCategories = () => {
    CategoriesService.getAllCategories()
    .then(resp => {
      console.log(resp)
      setFiltered(resp.data);
      setcategorys(resp.data);
    })
  }
  useEffect(() => {
    getCategories()
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
    direction == "rtl" ? setMessage("هل تريد حذف هذا العنصر؟") : setMessage("Are you sure you want to delete this item")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = () => {
      CategoriesService.deleteCategory(id)
      .then(resp => {
        toast.success("Category deleted succesfully")
        getCategories()
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
  const [_category, setcategory] = useState(null);
  const showcategory = (d) => {
    setShow(true);
    setcategory(d);
    setCreate(false);
  }
  const addNew = () => {
    setCreate(true);
    setShow(true);
  } 
  const back = () => {
    setCreate(false)
    setShow(false)
    setcategory(null)
  }
  return (
    <DashboardLayout>
      {
        !show && <> <DashboardNavbar name={direction == 'rtl' ? "الأصناف" : "Categories"} />
        <MDButton onClick={() => addNew()} color="primary">
        {direction == 'rtl' ? "إضافة صنف" : "Create Category"}
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
                  {direction == 'rtl' ? "جدول الأصناف" : "Categories Table"}
                  </MDTypography>
                </MDBox>
                {rows != null && rows.length > 0 &&  
                 <DataTable
                    type='categories'
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
         <DashboardNavbar name={direction == 'rtl' ? "إضافة أو تعديل صنف" : "Create or Edit Category"} />
         <CreateCategory direction={direction} isCreate={createNew} category={_category} backToPrevious={() => back()} />
        </>
      }
      <DamageDialog />
    </DashboardLayout>
  );
}

export default Categories;
