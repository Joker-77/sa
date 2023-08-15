/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { TextField, Grid, MenuItem } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup"
import MDButton from "components/MDButton";
import { toast } from 'react-toastify';
import CategoriesService from "services/CategoriesService";
export const CreateCategory = ({ category, isCreate, backToPrevious }) => 
{
    console.clear()
    const FILE_SIZE = 524288;
    const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
    // const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
    // const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
    const categoryValidation = yup.object().shape({
        name: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
        name_a: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
    });
    const initialValue =  useMemo(
        () => {
        if (isCreate)
            return {
                name: "",
                name_a: "",
            };
        else 
            return {
                    name: category?.name,
                    name_a: category?.name_a,
                }
        },
        [isCreate]
      );
  
    console.log(category)
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState();

    const [selectedFile1, setSelectedFile1] = useState(null);
    const [file1, setFile1] = useState();

    function handleChange(e) {
        setSelectedFile(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        imageStyle.display = 'inline-block';
        setStyle(imageStyle);
      }
    function handleChange1(e) {
        setSelectedFile1(e.target.files[0]);
        setFile1(URL.createObjectURL(e.target.files[0]));
        imageStyle1.display = 'inline-block';
        setStyle1(imageStyle1);
      }
    const handleSubmit = (values, props) => {
        if(selectedFile == null)
        {
            toast.error("Primary Image is required")
            return
        }
        if(selectedFile1 == null)
        {
            toast.error("Second Image is required")
            return
        }
        var data = new FormData();
        Object.keys(values).forEach((e) => {
        data.append(e, values[e]);
        });
        if (selectedFile) data.append('image', selectedFile);
        if (selectedFile1) data.append('image1', selectedFile);
        if(isCreate)
        {
            CategoriesService.addCategory(data).then(resp => { 
                toast.success(resp.message);
            }).catch(error => toast.error("An error"))
        }
        else {
            CategoriesService.updateCategory(category.id, data).then(resp => { 
                toast.success(resp.message);
            }).catch(error => toast.error("An error"))
        }
    };
   
    let imageStyle = {
        display: 'none',
      };
    const [style, setStyle] = useState(imageStyle);

    let imageStyle1 = {
        display: 'none',
      };
    const [style1, setStyle1] = useState(imageStyle1);
    return <React.Fragment>
                <Formik
                initialValues={initialValue}
                validationSchema={categoryValidation}
                onSubmit={handleSubmit}
                >
                     {(props) => {
                        const { name, name_a } = props.values;
                return (
                  <Form>
            <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                        <TextField
                            label="English Name"
                            name="name"
                            variant="outlined"
                            margin="dense"
                            value={name}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="name" />}
                            error={props.errors.name && props.touched.name}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                            label="Arabic Name"
                            name="name_a"
                            variant="outlined"
                            margin="dense"
                            value={name_a}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="name_a" />}
                            error={props.errors.name_a && props.touched.name_a}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
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
                            alt="category-image"
                            className="mt-2"
                            src={file}
                            width={150}
                            height={150}
                            style={style}
                            />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                        name="image1"
                        type="file"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        onChange={handleChange1}
                        onBlur={props.handleBlur}
                        required
                        />
                        <img
                            alt="category-image"
                            className="mt-2"
                            src={file1}
                            width={150}
                            height={150}
                            style={style1}
                            />
                    </Grid>
                <Grid item xs={4}>
                        <MDButton
                        variant="contained"
                        type="submit"
                        color="primary"
                        fullWidth
                        >
                        Submit
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
                        Back
                        </MDButton>
                </Grid>
                    </Grid>
                  </Form>
                );
              }}
                </Formik>            
    </React.Fragment>
}