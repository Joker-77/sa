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
import OrdersService from "services/OrdersService";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { TextField, MenuItem } from "@mui/material";

function Orders() {
  const [orders, setOrders] = useState([]);
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
      Header:  direction == "ltr" ? "Customer Name":"اسم العميل",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.user?.name}
    </MDTypography> },
      width: 50,
      dataKey: 'user',
    },
    {
      Header: direction == "ltr" ? "Status" : "حالة الطلب",
      accessor: (d) => { return  <MDTypography style={{ color: d.order_status.color }} display="block" variant="button" fontWeight="medium">
      {d.order_status?.name}
    </MDTypography> },
      width: 50,
      dataKey: 'order_status',
    },
    {
      Header: direction == "ltr" ? "Address" : "العنوان",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.address}
    </MDTypography> },
      width: 50,
      dataKey: 'address',
    },
    {
      Header: direction == "ltr" ? "Sub Total" : "المجموع الجزئي",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.sub_total}
    </MDTypography> },
      width: 50,
      dataKey: 'sub_total',
    },
    {
      Header: direction == "ltr" ? "Total" : "المجموع الكلي",
      accessor: (d) => { return  <MDTypography display="block" variant="button" fontWeight="medium">
      {d.total}
    </MDTypography> },
      width: 50,
      dataKey: 'total',
    },
    {
      Header: direction == "ltr" ? "Products Count" : "عدد العناصر",
      accessor: (d) => 
      { return  <MDTypography display="block" variant="button" fontWeight="medium">
           {d.items?.length}
      </MDTypography> },
      width: 50,
      dataKey: 'brand',
    },
    {
      Header: direction == "ltr" ? "Actions" : "إعدادات",
      accessor: (d) => 
      { 
        return <>  <MDButton onClick={() => handleChangeStatus(d.id)} style={{ margin: '0 5px 0 5px', backgroundColor: "lightblue" }}>
                        {direction == 'rtl' ? "تعديل حالة الطلب" : "Edit Status"}
                  </MDButton>  
                  <MDButton  onClick={() => handleClickOpen(1, d.id)} color="warning" style={{ backgroundColor: "red" }}>
                    {direction == 'rtl' ? "حذف" : "Delete"}
                  </MDButton> </>
      },
      width: 50,
    }
  ];
  const getOrders = () => {
    OrdersService.getAllOrders()
    .then(resp => {
      console.log(resp)
      setFiltered(resp.data);
      setOrders(resp.data);
    })
  }
  useEffect(() => {
    getOrders()
  }, [])
  // Damage Dialog
  const [open, setOpen] = React.useState(false);
  const [del, setDelete] = React.useState(0);
  const [id, setId] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [openStatus, setOpenStatus] = React.useState(false);
  const [changeStatusMessage, setChangeStatusMessage] = React.useState("");
  const ORDER_STATUS = [
    { name: 'Pending', status: 'pending', serial: 1 },
    { name: 'Preparation', status: 'preparation', serial: 2 },
    { name: 'Delivery', status: 'delivery', serial: 3 },
    { name: 'Delivered', status: 'delivered', serial: 4 },
    { name: 'Rejected', status: 'rejected', serial: 5 },
  ];
  const [status, setStatus] = React.useState(ORDER_STATUS[0]);
  const handleClickOpen = (number, id) => {
    setDelete(number)
    setId(id)
    setMessage("هل تريد حذف هذا العنصر؟")
    setOpen(true);
  };

  const handleChangeStatus = (id) => {
    setId(id);
    direction == "rtl" ? setChangeStatusMessage("تغيير حالة الطلب") : setChangeStatusMessage("Change order status");
    setOpenStatus(true)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseStatus = () =>{
    setOpenStatus(false);
  }
  const handleAction = () => {
    OrdersService.deleteOrder(id)
      .then(resp => {
        toast.success("Order deleted succesfully")
        getOrders()
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

  const handleActionStatus = () => {
    let st = ORDER_STATUS.filter(e => e.status == status)[0];
    console.log(st);
    let data = new FormData();
    Object.keys(st).forEach((e) => {
        data.append(e, st[e]);
        console.log(e, st[e])
    });
    OrdersService.changeStatus(id, data)
    .then(resp => {
      toast.success(resp.data.message)
    }).catch(error => { toast.error("An error occured")})
  }
  const ChangeStatus = (props) => {
      return <Dialog
          open={openStatus}
          onClose={handleCloseStatus}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            { changeStatusMessage }
          </DialogTitle>
          <DialogContent>
          <Grid item xs={12} md={10}>
                  <TextField
                      style={{ height: "3em" }}
                      label={direction == "ltr" ? "Status" : "الحالة"}
                      name="status"
                      variant="outlined"
                      margin="dense"
                      value={status.status}
                      fullWidth
                      select
                      onChange={(event) => setStatus(event.target.value)}
                      onBlur={props.handleBlur}
                      required
                  >
                      {ORDER_STATUS != null && ORDER_STATUS.map((cat) => (
                          <MenuItem key={cat.status} value={cat.status}>
                          {cat.name}
                          </MenuItem>
                      ))}
                  </TextField>
              </Grid>
          </DialogContent>
          <DialogActions>
            <MDButton  color="primary" onClick={handleActionStatus} autoFocus>
              { direction == "ltr" ? "Yes" : "نعم" }
            </MDButton>
            <MDButton color="red" onClick={handleClose}>
            { direction == "ltr" ? "No" : "لا" }
            </MDButton>
          </DialogActions>
        </Dialog>
  }
  // 
  const ChangeStatusDialog = (props) => {
    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { changeStatusMessage }
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
      let _searched = orders.filter(e => e.en_name.toLowerCase().includes(value) 
      || e.ar_name.toLowerCase().includes(value)
      || e.brand.toLowerCase().includes(value)
      || e.unit_price.toString().toLowerCase().includes(value)
      || e.entity.toString().toLowerCase().includes(value)
      || e.selling_price.toString().toLowerCase().includes(value));
      setFiltered(_searched)
    }
    else 
    setFiltered(orders)
  }, 100);
  //
  const [show, setShow] = useState(false);
  const [createNew, setCreate] = useState(false);
  const [_order, setOrder] = useState(null);
  const showOrder = (d) => {
    setShow(true);
    setOrder(d);
    setCreate(false);
  }
  return (
    <DashboardLayout>
      {
        !show && <> <DashboardNavbar name={direction == 'rtl' ? "الطلبات" : "Orders"} />
        {/* <MDButton onClick={() => addNew()} color="primary">
        {direction == 'rtl' ? "إضافة منتج" : "Create Order"}
        </MDButton> */}
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
                  {direction == 'rtl' ? "جدول الطلبات" : "Orders Table"}
                  </MDTypography>
                </MDBox>
                {rows != null && rows.length > 0 &&  
                 <DataTable
                    type='orders'
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
      <DamageDialog />
      <ChangeStatus />
    </DashboardLayout>
  );
}

export default Orders;
