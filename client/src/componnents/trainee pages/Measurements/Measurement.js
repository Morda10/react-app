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
import { IconButton } from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});


export const Measurement = ({measurements}) => {
    const classes = useStyles();
    const [addingRow, setAddingRow] = useState(false)
    
useEffect(() => {
  console.log(measurements)
 
}, [measurements])

    const columns = [
      { id: 'Date', label: 'Date', minWidth: 50 },
      { id: 'Weight', label: 'Weight', minWidth: 50, align: 'right', },
      {
        id: 'Waist',
        label: 'Waist',
        minWidth: 50,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'Arms',
        label: 'Arms',
        minWidth: 50,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'Thighes',
        label: 'Thighes',
        minWidth: 50,
        align: 'right',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'Pelvis',
        label: 'Pelvis',
        minWidth: 50,
        align: 'right',
        format: (value) => value.toFixed(2),
      },
  ];

  const newRow = 
      <TableRow >
           <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
      </TableRow>

    return (
      <>
        <TableContainer component={Paper}>
        <Table className={classes.table} >
          <TableHead>
            <TableRow>
            {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {measurements.map((m) => (
              <TableRow key={m.date}>
                <TableCell component="th" scope="row">
                  {moment(m.date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">{m.weight}</TableCell>
                <TableCell align="right">{m.waist}</TableCell>
                <TableCell align="right">{m.arms}</TableCell>
                <TableCell align="right">{m.thighes}</TableCell>
                <TableCell align="right">{m.pelvis}</TableCell>
              </TableRow>
            ))}
            {addingRow ? newRow : null}
          </TableBody>
        </Table>
      </TableContainer>
      {addingRow ? null :  <IconButton onClick={()=>{setAddingRow(true)}}>
              <ControlPointIcon color="primary" fontSize="large"/>
      </IconButton>}
       </>
    )
}
