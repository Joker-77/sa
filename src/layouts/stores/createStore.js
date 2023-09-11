/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { TextField, Grid, MenuItem, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup"
import MDButton from "components/MDButton";
import { toast } from 'react-toastify';
import StoresService from "services/StoresService";
export const CreateStore = ({ direction, store, isCreate, backToPrevious }) => 
{
    const FILE_SIZE = 524288;
    const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
    const storeValidation = yup.object().shape({
        en_name: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
        ar_name: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
        email: yup
            .string()
            .email("Invalid email format")
            .required("Required !"),
        phone: yup
            .string()
            .required("Required !"),
        en_address: yup
            .string()
            .required("Required !"),
        ar_address: yup
            .string()
            .required("Required !"),
        country_id: yup.string().required("Required !"),
        
    });
    const initialValue =  useMemo(
        () => {
        if (isCreate)
            return {
                en_name: "",
                ar_name: "",
                en_address: "",
                ar_address: "",
                email: "",
                phone: "",
                country_id: 0,
            };
        else 
            return {
                    en_name: store?.en_name,
                    ar_name: store?.ar_name,
                    en_address: store?.en_address,
                    ar_address: store?.ar_address,
                    email: store?.email,
                    phone: store?.phone,
                    country_id: store?.country_id,
                }
        },
        [isCreate]
      );
  
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState();

    function handleChange(e) {
        setSelectedFile(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        imageStyle.display = 'inline-block';
        setStyle(imageStyle);
    }
  
    const handleSubmit = (values, props) => {
        if(selectedFile == null)
        {
            toast.error("Primary Image is required")
            return
        }
        var data = new FormData();
        Object.keys(values).forEach((e) => {
        data.append(e, values[e]);
        });
        if (selectedFile) data.append('image', selectedFile);
        if(isCreate)
        {
            StoresService.addStore(data).then(resp => { 
                toast.success(resp.message);
            }).catch(error => toast.error("An error"))
        }
        else {
            StoresService.updateStore(store.id, data).then(resp => { 
                toast.success(resp.message);
            }).catch(error => toast.error("An error"))
        }
    };
   
    let imageStyle = {
        display: 'none',
    };

    useEffect(() => {
        StoresService.getAllCountries().then(res => {
            console.log(res.data)
            setCountries(res.data);
                if(!isCreate)
                    setCountry(res.data.find((c) => c.id === initialValue?.country_id));
            }).catch(error => { })
    }, []);

    const [style, setStyle] = useState(imageStyle);
    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState(null);
    
    return <React.Fragment>
                <Formik
                initialValues={initialValue}
                validationSchema={storeValidation}
                onSubmit={handleSubmit}
                >
                     {(props) => {
                        const { en_name, ar_name, en_address, ar_address,
                                phone, email, country_id } = props.values;
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
                            label={direction == "rtl" ? "عنوان البريد الإلكتروني" : "Email address"}
                            name="email"
                            variant="outlined"
                            margin="dense"
                            value={email}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="email" />}
                            error={props.errors.email && props.touched.email}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "رقم الهاتف" : "phone"}
                            name="phone"
                            variant="outlined"
                            margin="dense"
                            value={phone}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="phone" />}
                            error={props.errors.phone && props.touched.phone}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "العنوان بالإنكليزي" : "English Address"}
                            name="en_address"
                            variant="outlined"
                            margin="dense"
                            value={en_address}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="en_address" />}
                            error={props.errors.en_address && props.touched.en_address}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "العنوان بالعربي" : "Arabic Address"}
                            name="ar_address"
                            variant="outlined"
                            margin="dense"
                            value={ar_address}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="ar_address" />}
                            error={props.errors.ar_address && props.touched.ar_address}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                            style={{ height: "3em" }}
                            label={direction == "rtl" ? "الدولة" : "Country"}
                            name="country_id"
                            variant="outlined"
                            margin="dense"
                            value={country_id}
                            fullWidth
                            select
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="country_id" />}
                            error={props.errors.country_id && props.touched.country_id}
                            required
                        >
                            {countries != null && countries.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.NAME} {`(${cat.ISO})`}
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
                        required
                        />
                        <img
                            alt="store-image"
                            className="mt-2"
                            src={file}
                            width={150}
                            height={150}
                            style={style}
                            />
                </Grid>
                <Grid item xs={4}>
                        <MDButton
                        variant="contained"
                        type="submit"
                        color="primary"
                        fullWidth
                        >
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
}