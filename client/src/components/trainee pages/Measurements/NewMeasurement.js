import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { Button, IconButton, TextField  } from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { useDispatch, useSelector } from 'react-redux'
import { setMeasurements } from '../../../redux/reducers/UserReducer'
import MyTextField from '../../Input/Input'
import Axios from 'axios'
import { Form, Formik } from 'formik'


const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
    button: {
      color: "blue",
      margin: "1rem"
    },
    textField: {
      width: "3rem",
     
    },
    date: {
      width: "9rem",
     
    },
  });

export const NewMeasurement = ({addingRow}) => {
    const classes = useStyles();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState(undefined)

    const tableRow = (
        <TableRow >
        <TableCell> 
            <MyTextField
                className={classes.date}
                name="date"
                type="date"
            />
        </TableCell>
        <TableCell align="right"> 
            <MyTextField
                className={classes.textField}
                name="weight"
                type="number"
            />
        </TableCell>
        <TableCell align="right"> 
            <MyTextField
                className={classes.textField}
                name="waist"
                type="number"
            />
        </TableCell>
        <TableCell align="right">
            <MyTextField
                className={classes.textField}
                name="arms"
                type="number"
            />
        </TableCell>
        <TableCell align="right">
            <MyTextField
                className={classes.textField}
                name="thighes"
                type="number"
            />
        </TableCell>
        <TableCell align="right">
            <MyTextField
                className={classes.textField}
                name="pelvis"
                type="number"
             />
        </TableCell>
          
    </TableRow>
    
    )
   
    const newTable = (
        <TableContainer component={Paper}>
            <Table className={classes.table} >
                <TableBody>
                    {/* <form className={classes.root} noValidate autoComplete="off"> */}
                        {tableRow}            
                    {/* </form> */}
            {/* {addingRow ? newRow : null} */}
            {/* <NewMeasurement addingRow={addingRow} /> */}
          </TableBody>
        </Table>
      </TableContainer>
    )

    const formikVar = 
    ( <Formik
        initialValues={{
        date: new moment(),
        weight: 0,
        weist: 0,
        arms: 0,
        thighes: 0,
        pelvis: 0,
        }}
        // validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
        try {
            const res = await Axios.post("/api/measurements/createMeasurement", {user: user.user.id, measurements: values});

            // check for errors
            if(!res.data.err)   dispatch(setMeasurements({measurements : res.data.measurements}));
            else setErrors(res.data.err)

        } catch (e) {
            setErrors(e.response.data.errors[0].msg);
            actions.resetForm();
        }
        }}
    >
     {(values, isSubmitting) => (
       <Form>
           {newTable}
         <Button
           className={classes.button}
           variant="contained"
           disabled={isSubmitting}
           type="submit"
         >
           Submit
         </Button>
       </Form>
     )}
   </Formik>)

    return (
        <>
            {formikVar}
        </>
    )
}
