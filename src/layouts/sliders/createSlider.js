/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { TextField, Grid, MenuItem, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup"
import MDButton from "components/MDButton";
import CategoriesService from "services/CategoriesService"
import CouponsService from "services/CouponsService";
import { toast } from 'react-toastify';
import { SlidersService } from "services/SlidersService";
import { StoresService } from "services/StoresService";
export const CreateSlider = ({ direction, slider, isCreate, backToPrevious }) => 
{
    console.clear()
    console.log(slider)
    const FILE_SIZE = 524288;
    const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
    // const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
    // const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
    const sliderValidation = yup.object().shape({
        en_title: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
        ar_title: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
        en_title1: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
        ar_title1: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
    });
    const initialValue =  useMemo(
        () => {
        if (isCreate)
            return {
                en_title: "",
                ar_title: "",
                en_title1: "",
                ar_title1: "",
            };
        else 
            return {
                en_title: slider?.en_title,
                ar_title: slider?.ar_title,
                en_title1: slider?.en_title1,
                ar_title1: slider?.ar_title1,
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
            toast.error("Image is required")
            return
        }
        console.log(values);
        var data = new FormData();
        Object.keys(values).forEach((e) => {
            data.append(e, values[e]);
        });
        if (selectedFile) data.append('image', selectedFile);
        if(isCreate)
        {
            SlidersService.addSlider(data).then(resp => { 
                toast.success(resp.message);
            }).catch(error => toast.error("An error"))
        }
        else {
            SlidersService.updateSlider(slider.id, data).then(resp => { 
                toast.success(resp.message);
            }).catch(error => toast.error("An error"))
        }
    };
  
    let imageStyle = {
        display: 'none',
      };
    const [style, setStyle] = useState(imageStyle);
    return <React.Fragment>
                <Formik
                initialValues={initialValue}
                validationSchema={sliderValidation}
                onSubmit={handleSubmit}
                >
                     {(props) => {
                        const { en_title, ar_title, en_title1, ar_title1 } = props.values;
                return (
                  <Form>
            <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "العنوان بالإنكليزي" : "English Title"}
                            name="en_title"
                            variant="outlined"
                            margin="dense"
                            value={en_title}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="en_title" />}
                            error={props.errors.en_title && props.touched.en_title}
                            required
                        />
                </Grid>
                <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "العنوان بالعربي" : "Arabic Title"}
                            name="ar_title"
                            variant="outlined"
                            margin="dense"
                            value={ar_title}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="ar_title" />}
                            error={props.errors.ar_title && props.touched.ar_title}
                            required
                        />
                </Grid>
                <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "العنوان الفرعي بالإنكليزي" : "English SubTitle"}
                            name="en_title1"
                            variant="outlined"
                            margin="dense"
                            value={en_title1}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="en_title1" />}
                            error={props.errors.en_title1 && props.touched.en_title1}
                            required
                        />
                </Grid>
                <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "العنوان الفرعي بالعربي" : "Arabic SubTitle"}
                            name="ar_title1"
                            variant="outlined"
                            margin="dense"
                            value={ar_title1}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="ar_title1" />}
                            error={props.errors.ar_title1 && props.touched.ar_title1}
                            required
                        />
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
                            alt="slider-image"
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