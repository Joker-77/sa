/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import { TextField, Grid, MenuItem, FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup"
import MDButton from "components/MDButton";
import CouponsService from "services/CouponsService"
import { toast } from 'react-toastify';
import UsersService from "services/UsersService";
export const CreateCoupon = ({ coupon, isCreate, backToPrevious }) => 
{
    console.log(coupon)
    const couponValidation = yup.object().shape({
        discounts: yup
            .number()
            .min(0)
            .max(100, "Discounts must be less than")
            .required("Required !"),
        type: yup
            .string()
            .min(3, "Too Short !")
            .max(30, "Too Long !")
            .required("Required !"),
    });
    const initialValue =  useMemo(
        () => {
        if (isCreate)
            return {
                discounts: 0,
                type: "",
            };
        else 
            return {
                    discounts: coupon?.discounts,
                    code: coupon?.code,
                    type: coupon?.type,
                }
        },
        [isCreate]
      );
  
    const [marketers, setMarketers] = useState([])
    const [selected, setSelectedMarketers] = useState([])
    const selectMarketers = (value) => {
        console.log(value);
    }
    const getUsers = (type) => {
        UsersService.getAllMarketers()
        .then(resp => {
        let emails = resp.data?.map(e => e.email);
        setSelectedMarketers(resp.data)
        setMarketers(emails);
        })
    }
    useEffect(() => {
        getUsers('marketers')
    },[])
    const [personName, setPersonName] = React.useState([]);
    const handleChangeMrk = (event) => {
        console.log(event);
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    const handleSubmit = (values, props) => {
        var data = new FormData();
        Object.keys(values).forEach((e) => {
        data.append(e, values[e]);
        });
        if(isCreate)
        {
            CouponsService.addCoupon(data).then(resp => { 
                toast.success(resp.message);
            }).catch(error => toast.error("An error"))
        }
        else {
            CouponsService.updateCoupon(coupon.id, data).then(resp => { 
                toast.success(resp.message);
            }).catch(error => toast.error("An error"))
        }
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };
    const assign = () => {
        console.log(personName);
        console.log(selected);
        let _ids = selected.filter(e => personName.includes(e.email));
        console.log(_ids.map(e => e.id));
        CouponsService.assignCouponToMarketer(coupon.id, _ids.map(e => e.id))
        .then(resp => toast.success(resp))
        .catch(error => toast.error('An error occured'))
    }
    return <React.Fragment>
                <Formik
                initialValues={initialValue}
                validationSchema={couponValidation}
                onSubmit={handleSubmit}
                >
                     {(props) => {
                        const { discounts, code, type } = props.values;
                return (
                  <Form>
            <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                        <TextField
                            label="Discount"
                            name="discounts"
                            variant="outlined"
                            margin="dense"
                            type="number"
                            value={discounts}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="discounts" />}
                            error={props.errors.discounts && props.touched.discounts}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                            label="Code"
                            name="code"
                            variant="outlined"
                            margin="dense"
                            value={code}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                            label="Type"
                            name="type"
                            variant="outlined"
                            margin="dense"
                            value={type}
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={<ErrorMessage name="type" />}
                            error={props.errors.type && props.touched.type}
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
                {
                    !isCreate && marketers.length > 0 &&
                    <Grid>
                        <FormControl sx={{ m: 1, width: 600 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Marketer</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChangeMrk}
                            input={<OutlinedInput label="Marketer" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            >
                        {marketers.length > 0 && marketers.map((name) => (
                            <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                        <Grid item xs={5} style={{ marginTop: "1em" }}>
                            <MDButton
                                onClick={assign}
                                variant="contained"
                                type="submit"
                                color="primary"
                                fullWidth
                                >
                                Assign Coupon to marketers
                            </MDButton>
                        </Grid>
                    </FormControl>
                    </Grid>
                }           
    </React.Fragment>
}