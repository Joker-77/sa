/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { TextField, Grid, MenuItem } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup"
import MDButton from "components/MDButton";
import CategoriesService from "services/CategoriesService"
import CouponsService from "services/CouponsService";
import { toast } from 'react-toastify';
import { UsersService } from "services/UsersService";

export const CreateUser = ({ direction, user, isCreate, backToPrevious }) => 
{
    console.clear()
    console.log(user)
    console.log(isCreate)
    const FILE_SIZE = 524288;
    const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
    // const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
    // const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
    const userValidation = yup.object().shape({
        name: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
        email: yup
            .string()
            .email("Invalid email address")
            .required("Required !"),
        password: yup
            .string()
            .required("Required !"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Password does not matched")
            .required("Confirm Password is Required"),
        phone: yup
            .string()
            .required("Required !"),
        birthday: yup
            .string()
            .required("Required !"),
        address: yup
            .string()
            .required("Required !"),
        role: yup
            .string()
            .required("Required !"),
    });
    const initialValue =  useMemo(
        () => {
        if (isCreate)
            return {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                phone: "",
                birthday: "",
                role: "",
            };
        else 
            return {
                name: user?.name,
                email: user?.email,
                password: user?.password,
                confirmPassword: "",
                address: user?.address,
                phone: user?.address,
                birthday: user?.birthday,
                role: user?.role,
            }
        },
        [isCreate]
      );
  
    const handleSubmit = (values, props) => {
        console.log(values);
        var data = new FormData();
        Object.keys(values).forEach((e) => {
            if(e != "confirmPassword")
        data.append(e, values[e]);
        });
        if(isCreate)
        {
            UsersService.addUser(data).then(resp => { 
                console.log(resp)
                toast.success(resp.message);
            }).catch(error => {
                Object.keys( error.response.data.message).map(e => {
                toast.error(error.response.data.message[e][0])
                })
            })
        }
        else {
            UsersService.updateUser(user.id, data).then(resp => { 
                console.log(resp)
                toast.success(resp.message);
            }).catch(error => {
                Object.keys( error.response.data.message).map(e => {
                    toast.error(error.response.data.message[e][0])
                    })
            })
        }
    };
    return <React.Fragment>
                <Formik
                initialValues={initialValue}
                validationSchema={userValidation}
                onSubmit={handleSubmit}
                >
                     {(props) => {
                        const { name, email, password, confirmPassword, phone, role, 
                            birthday, address } = props.values;
                return (
                  <Form>
            <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "الاسم" : "Name"}
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
                            label={direction == "rtl" ? "الإيميل" : "Email"}
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
                            label={direction == "rtl" ? "كلمة المرور" : "Password"}
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            value={password}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="password" />}
                            error={props.errors.password && props.touched.password}
                            required
                        />
                </Grid>
                <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "تأكيد كلمة المرور" : "Confirm Password"}
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            value={confirmPassword}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="confirmPassword" />}
                            error={props.errors.confirmPassword && props.touched.confirmPassword}
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
                            label={direction == "rtl" ? "العنوان" : "address"}
                            name="address"
                            variant="outlined"
                            margin="dense"
                            value={address}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="address" />}
                            error={props.errors.address && props.touched.address}
                            required
                        />
                </Grid>
                <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "الدور" : "Role"}
                            name="role"
                            variant="outlined"
                            margin="dense"
                            value={role}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="role" />}
                            error={props.errors.role && props.touched.role}
                            required
                        />
                </Grid>
                <Grid item xs={12} md={10}>
                        <TextField
                            label={direction == "rtl" ? "تاريخ الميلاد" : "birthday"}
                            type="date"
                            name="birthday"
                            variant="outlined"
                            margin="dense"
                            value={birthday}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="birthday" />}
                            error={props.errors.birthday && props.touched.birthday}
                            required
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