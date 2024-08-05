import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css'

function createData(name,trackingId,data,status) {
  return { name,trackingId,data,status };
}

const rows = [
  createData('Dark Chocolate', 630,"27 sep 2024","Approved"),
  createData('Ice cream', 3,"27 sep 2024","Pending"),
  createData('Oreo MilkShake', 40,"27 sep 2024","Approved"),
  createData('Cupcake', 68,"27 sep 2024","Delivered"),
  createData('Bingo chips',94 ,"27 sep 2024","Approved"),
];
const makeStyles=(status)=>{
    if(status==='Approved'){
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        }
    }
    else if(status=== 'Pending'){
        return {
            background: '#ffada8',
            color: 'red',
        }
    }
    else{
        return{
            background: '#59bfff',
            color: 'white',
        }
    }
}

export default function BasicTable() {
  return (
    <div className="Table">
        <h2>Recent Orders</h2>
    <TableContainer component={Paper}
    style={{
        boxShadow: '0px 13px 20px 0px #80808029'
    }}
    
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Tracking ID</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Queries</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.trackingId}</TableCell>
              <TableCell align="left">{row.data}</TableCell>
              <TableCell align="left">
              <span className="status" style={makeStyles(row.status)}>{row.status}</span>
              </TableCell>
              <TableCell align="left">Detail</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
