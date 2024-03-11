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
import StudentsService from "services/StudentsService";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { CreateStudent } from "./createStudent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";

function Students() {
  const [products, setProducts] = useState([]);
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
    {
      Header: direction == "ltr" ? "Actions" : "إعدادات",
      accessor: (d) => {
        return (
          <>
            {" "}
            <MDButton
              onClick={() => showProduct(d)}
              style={{ margin: "0 5px 0 5px", backgroundColor: "lightblue" }}
            >
              {direction == "rtl" ? "تعديل" : "Edit"}
            </MDButton>
            <MDButton
              onClick={() => handleClickOpen(0, d.id)}
              color="warning"
              style={{ margin: "0 5px 0 5px" }}
            >
              {direction == "rtl" ? "إتلاف" : "Damage"}
            </MDButton>
            <MDButton
              onClick={() => handleClickOpen(1, d.id)}
              color="warning"
              style={{ backgroundColor: "red" }}
            >
              {direction == "rtl" ? "حذف" : "Delete"}
            </MDButton>{" "}
          </>
        );
      },
      width: 50,
    },
  ];
  const getProducts = () => {
    StudentsService.getAllStudents().then((resp) => {
      console.log(resp);
      // setFiltered(resp.data);
      // setProducts(resp.data);
    });
  };
  useEffect(() => {
    // getProducts();
  }, []);
  // Damage Dialog
  const [open, setOpen] = React.useState(false);
  const [del, setDelete] = React.useState(0);
  const [id, setId] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const handleClickOpen = (number, id) => {
    setDelete(number);
    setId(id);
    number == 0 ? setMessage("هل تريد إتلاف هذا العنصر؟") : setMessage("هل تريد حذف هذا العنصر؟");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAction = () => {
    if (del == 0) {
      ProductsService.damageProduct(id)
        .then((resp) => {
          toast.success(resp.message);
          getProducts();
          setOpen(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else {
      ProductsService.deleteProduct(id)
        .then((resp) => {
          toast.success("Product deleted succesfully");
          getProducts();
          setOpen(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    }
  };
  const DamageDialog = (props) => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          <MDButton color="primary" onClick={handleAction} autoFocus>
            {direction == "ltr" ? "Yes" : "نعم"}
          </MDButton>
          <MDButton color="red" onClick={handleClose}>
            {direction == "ltr" ? "No" : "لا"}
          </MDButton>
        </DialogActions>
      </Dialog>
    );
  };

  // custom pagination

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [search, setSearch] = useState();
  const onSearchChange = useAsyncDebounce((value) => {
    setSearch(value);
    if (!!value) {
      let _searched = products.filter(
        (e) =>
          e.en_name.toLowerCase().includes(value) ||
          e.ar_name.toLowerCase().includes(value) ||
          e.brand.toLowerCase().includes(value) ||
          e.unit_price.toString().toLowerCase().includes(value) ||
          e.entity.toString().toLowerCase().includes(value) ||
          e.selling_price.toString().toLowerCase().includes(value)
      );
      setFiltered(_searched);
    } else setFiltered(products);
  }, 100);
  //
  const [show, setShow] = useState(false);
  const [createNew, setCreate] = useState(false);
  const [_product, setProduct] = useState(null);
  const showProduct = (d) => {
    setShow(true);
    setProduct(d);
    setCreate(false);
  };
  const addNew = () => {
    setCreate(true);
    setShow(true);
  };
  const back = () => {
    setCreate(false);
    setShow(false);
    setProduct(null);
  };
  return (
    <DashboardLayout>
      {!show && (
        <>
          {" "}
          <DashboardNavbar name={direction == "rtl" ? "الطلاب" : "Students"} />
          <MDButton onClick={() => addNew()} color="primary">
            {direction == "rtl" ? "إضافة طالب" : "Create Student"}
          </MDButton>
          <MDInput
            style={{ marginTop: "1em" }}
            placeholder={direction == "rtl" ? "بحث" : "Search"}
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
                      {direction == "rtl" ? "جدول الطلاب" : "Students Table"}
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
          </MDBox>{" "}
        </>
      )}
      {show && (
        <>
          <DashboardNavbar
            name={direction == "rtl" ? "إضافة أو تعديل طالب" : "Create or Edit Product"}
          />
          <CreateStudent
            direction={direction}
            isCreate={createNew}
            product={_product}
            backToPrevious={() => back()}
          />
        </>
      )}
      <DamageDialog />
    </DashboardLayout>
  );
}

export default Students;
