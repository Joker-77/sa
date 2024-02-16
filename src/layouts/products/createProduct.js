/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { TextField, Grid, MenuItem, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import MDButton from "components/MDButton";
import CategoriesService from "services/CategoriesService";
import CouponsService from "services/CouponsService";
import { toast } from "react-toastify";
import { ProductsService } from "services/ProductsService";
import { StoresService } from "services/StoresService";
export const CreateProduct = ({ direction, product, isCreate, backToPrevious }) => {
  console.clear();
  console.log(product);
  console.log(isCreate);
  const FILE_SIZE = 524288;
  const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
  // const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
  // const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  const productValidation = yup.object().shape({
    en_name: yup.string().min(3, "Too Short !").max(30, "Too Long !").required("Required !"),
    ar_name: yup.string().min(3, "Too Short !").max(30, "Too Long !").required("Required !"),
    entity: yup.number().min(1).required("Required !"),
    selling_price: yup.number().min(0.5).required("Required !"),
    unit_price: yup.number().min(0.5).required("Required !"),
    en_description: yup.string(),
    ar_description: yup.string(),
    width: yup.number().required("Required !"),
    height: yup.number().required("Required !"),
    depth: yup.number().required("Required !"),
    brand: yup.string().required("Required !"),
    category_id: yup.string().required("Required !"),
    coupon_id: yup.string().nullable(),
    store_id: yup.string(),
  });
  const initialValue = useMemo(() => {
    if (isCreate)
      return {
        en_name: "",
        ar_name: "",
        en_description: "",
        ar_description: "",
        selling_price: 0,
        unit_price: 0,
        entity: 0,
        width: 0,
        height: 0,
        depth: 0,
        category_id: "",
        coupon_id: "",
        store_id: "",
        brand: "",
        store_id: 0,
      };
    else
      return {
        en_name: product?.en_name,
        ar_name: product?.ar_name,
        en_description: product?.en_description,
        ar_description: product?.ar_description,
        selling_price: product?.selling_price,
        unit_price: product?.unit_price,
        category_id: product?.category_id,
        coupon_id: product?.coupon_id || "",
        store_id: product?.store_id || "",
        entity: product?.entity,
        width: product?.width,
        height: product?.height,
        depth: product?.depth,
        brand: product?.brand,
      };
  }, [isCreate]);

  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [stores, setStores] = useState(null);

  const [coupon, setCoupon] = useState(null);
  const [coupons, setCoupons] = useState(null);
  const [store, setStore] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [file, setFile] = useState();
  const [file1, setFile1] = useState();
  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    imageStyle.display = "inline-block";
    setStyle(imageStyle);
  }
  function handleChange1(e) {
    setSelectedFile1(e.target.files[0]);
    setFile1(URL.createObjectURL(e.target.files[0]));
    imageStyle1.display = "inline-block";
    setStyle1(imageStyle1);
  }
  const handleSubmit = (values, props) => {
    if (selectedFile == null) {
      toast.error("Image is required");
      return;
    }
    console.log(values);

    var data = new FormData();
    Object.keys(values).forEach((e) => {
      data.append(e, values[e]);
    });
    if (colors.length > 0) data.append("color", JSON.stringify(colors));
    if (selectedFile) data.append("image", selectedFile);
    if (selectedFile1) data.append("image_2", selectedFile1);
    if (isCreate) {
      ProductsService.addProduct(data)
        .then((resp) => {
          toast.success(resp.message);
        })
        .catch((error) => toast.error("An error"));
    } else {
      ProductsService.updateProduct(product.id, data)
        .then((resp) => {
          toast.success(resp.message);
        })
        .catch((error) => toast.error("An error"));
    }
  };
  useEffect(() => {
    console.clear();
    StoresService.getAllStores()
      .then((res) => {
        console.log(res);
        setStores(res.data);
        if (!isCreate) setStore(res.data.find((c) => c.id === initialValue?.store_id));
      })
      .catch((error) => {});
    CategoriesService.getAllCategories()
      .then((resp) => {
        setCategories(resp.data);
        if (!isCreate) setCategory(resp.data.find((c) => c.id === initialValue?.category_id));
        CouponsService.getAllCoupons()
          .then((resps) => {
            setCoupons(resps.data);
            if (!isCreate) setCoupon(resps.data.find((c) => c.id === initialValue?.coupon_id));
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }, []);
  const [colors, setColors] = useState(
    !!product && product.color ? JSON.parse(product?.color) : []
  );
  const addColors = (event) => {
    let value = event.target.value;
    if (colors.length > 5) {
      toast.warning(`You can't choose more than 5 colors`);
    } else {
      let _colors = colors.slice();
      _colors.push(value);
      setColors(_colors);
    }
  };
  const removeColor = (event, index) => {
    let _colors = colors.slice();
    _colors.splice(index, 1);
    setColors(_colors);
  };
  let imageStyle = {
    display: "none",
  };
  let imageStyle1 = {
    display: "none",
  };
  const [style, setStyle] = useState(imageStyle);
  const [style1, setStyle1] = useState(imageStyle1);
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValue}
        validationSchema={productValidation}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            en_name,
            ar_name,
            en_description,
            ar_description,
            coupon_id,
            selling_price,
            unit_price,
            entity,
            width,
            height,
            depth,
            brand,
            category_id,
            store_id,
          } = props.values;
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "الاسم بالإنكليزي" : "English Name"}
                    name="en_name"
                    variant="outlined"
                    margin="dense"
                    value={en_name}
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="en_name" />}
                    error={props.errors.en_name && props.touched.en_name}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "الاسم بالعربي" : "Arabic Name"}
                    name="ar_name"
                    variant="outlined"
                    margin="dense"
                    value={ar_name}
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="ar_name" />}
                    error={props.errors.ar_name && props.touched.ar_name}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "الوصف بالإنكليزي" : "English Description"}
                    name="en_description"
                    variant="outlined"
                    margin="dense"
                    value={en_description}
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="en_description" />}
                    error={props.errors.en_description && props.touched.en_description}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "الوصف بالعربي" : "Arabic Description"}
                    name="ar_description"
                    variant="outlined"
                    margin="dense"
                    value={ar_description}
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="ar_description" />}
                    error={props.errors.ar_description && props.touched.ar_description}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "ماركة" : "Brand"}
                    name="brand"
                    variant="outlined"
                    margin="dense"
                    value={brand}
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="brand" />}
                    error={props.errors.brand && props.touched.brand}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    type="color"
                    label={direction == "rtl" ? "اللون" : "Color"}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    onChange={addColors}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  {colors.length > 0 &&
                    colors.map((color, index) => (
                      <div key={index} style={{ display: "flex" }} className="flex-wrap sm:my-8">
                        {`(${index})`}
                        <input type="color" value={color} disabled={true} />
                        <button type="button" onClick={(event) => removeColor(event, index)}>
                          x
                        </button>
                      </div>
                    ))}
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "سعر المبيع ($)" : "($) Selling Price"}
                    name="selling_price"
                    variant="outlined"
                    margin="dense"
                    value={selling_price}
                    fullWidth
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="selling_price" />}
                    error={props.errors.selling_price && props.touched.selling_price}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "سعر الواحدة ($)" : "($) Unit Price"}
                    name="unit_price"
                    variant="outlined"
                    margin="dense"
                    value={unit_price}
                    fullWidth
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="unit_price" />}
                    error={props.errors.unit_price && props.touched.unit_price}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "الكمية" : "Quantity"}
                    name="entity"
                    variant="outlined"
                    margin="dense"
                    value={entity}
                    fullWidth
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="entity" />}
                    error={props.errors.entity && props.touched.entity}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "العرض (سم)" : "Width (CM)"}
                    name="width"
                    variant="outlined"
                    margin="dense"
                    value={width}
                    fullWidth
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="width" />}
                    error={props.errors.width && props.touched.width}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "الارتفاع (سم)" : "Height (CM)"}
                    name="height"
                    variant="outlined"
                    margin="dense"
                    value={height}
                    fullWidth
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="height" />}
                    error={props.errors.height && props.touched.height}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    label={direction == "rtl" ? "العمق (سم)" : "Depth (CM)"}
                    name="depth"
                    variant="outlined"
                    margin="dense"
                    value={depth}
                    fullWidth
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="depth" />}
                    error={props.errors.depth && props.touched.depth}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    style={{ height: "3em" }}
                    label={direction == "rtl" ? "الصنف" : "Category"}
                    name="category_id"
                    variant="outlined"
                    margin="dense"
                    value={category_id}
                    fullWidth
                    select
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="category_id" />}
                    error={props.errors.category_id && props.touched.category_id}
                    required
                  >
                    {categories != null &&
                      categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    style={{ height: "3em" }}
                    label={direction == "rtl" ? "المخزن" : "Store"}
                    name="store_id"
                    variant="outlined"
                    margin="dense"
                    value={store_id}
                    fullWidth
                    select
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="store_id" />}
                    error={props.errors.store_id && props.touched.store_id}
                    required
                  >
                    {stores != null &&
                      stores.map((st) => (
                        <MenuItem key={st.id} value={st.id}>
                          {st.en_name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    style={{ height: "3em" }}
                    label={direction == "rtl" ? "الكوبون" : "Coupon"}
                    name="coupon_id"
                    variant="outlined"
                    margin="dense"
                    value={coupon_id}
                    fullWidth
                    select
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="coupon_id" />}
                    error={props.errors.coupon_id && props.touched.coupon_id}
                  >
                    {coupons != null &&
                      coupons.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={10}>
                  <Typography variant="h6">
                    {direction == "rtl" ? "الصورة الأولى" : "First Image"}
                  </Typography>
                  <TextField
                    name="image"
                    type="file"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    onChange={handleChange}
                    onBlur={props.handleBlur}
                  />
                  <img
                    alt="product-image"
                    className="mt-2"
                    src={file}
                    width={150}
                    height={150}
                    style={style}
                  />
                </Grid>
                <Grid item xs={12} md={10}>
                  <Typography variant="h6">
                    {direction == "rtl" ? "الصورة الثانية (AR)" : "Secondary Image (AR)"}
                  </Typography>
                  <TextField
                    name="image_2"
                    type="file"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    onChange={handleChange1}
                    onBlur={props.handleBlur}
                  />
                  <img
                    alt="product-image"
                    className="mt-2"
                    src={file1}
                    width={150}
                    height={150}
                    style={style1}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MDButton variant="contained" type="submit" color="primary" fullWidth>
                    {direction == "rtl" ? "إضافة" : "Submit"}
                  </MDButton>
                </Grid>
                <Grid item xs={2}>
                  <MDButton
                    onClick={backToPrevious}
                    variant="contained"
                    type="submit"
                    color="warning"
                    fullWidth
                  >
                    {direction == "rtl" ? "عودة" : "Back"}
                  </MDButton>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
