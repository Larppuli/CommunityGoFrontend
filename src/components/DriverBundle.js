import React from 'react';
import { Typography, Card, CardActionArea, Collapse } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MyButton from './Button'

const InfoTable = ({ legs }) => {
    
    return (
        <TableContainer component={Paper} style={{ background: '#353634', width: '95%', marginLeft: '2.5%'}}>
            <Table aria-label="simple table">
            <caption style={{ color: 'white', textAlign: 'center' }}><b>Destination: {legs[legs.length - 1].end_address}</b></caption>                
            <TableHead>
                <TableRow>
                    <TableCell style={{ color: 'white'}} align="left" ><b>Customers</b></TableCell>
                    <TableCell style={{ color: 'white', paddingRight: '44px'}} align="right" ><b>Pickup</b></TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    {legs.map((leg, index) => (
                    <TableRow
                        key={leg.start_address}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell style={{ color: 'white', paddingLeft: '44px'}} component="th" scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell style={{ color: 'white', maxWidth: '60px'}} component="th" scope="row" align="right">
                            {leg.start_address}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

function DriverBundle({ ride, handleShowRoute }) {
  const [expanded, setExpanded] = React.useState(false);
  const arrivalTime = new Date(ride.arrivalTime)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{background: '#5662FF', justifyContent: 'space-around', alignItems: 'center', marginBottom: '12px'}}>
      <CardActionArea onClick={handleExpandClick} style={{ display: 'flex', color: 'white',  justifyContent: 'space-around', alignItems: 'center', paddingBlock: '10px'  }}>
        <Typography style={{ textAlign: 'center', flex: '1', fontSize: '14px', maxWidth: '30%' }}>
          {ride.pickup.name}
        </Typography>
        <Typography style={{ textAlign: 'center', flex: '1', fontSize: '14px', maxWidth: '30%' }}>
          {ride.destination.name}
        </Typography>
        <Typography style={{ textAlign: 'center', flex: '1', fontSize: '14px', maxWidth: '30%' }}>
          {arrivalTime.getHours()}:{arrivalTime.getMinutes()}
        </Typography>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <InfoTable legs={ride.routes[0].legs} />
        <MyButton handleClick={handleShowRoute} buttonText="Show route on map" backgroundColor='#5662FF' margin="auto" width="100%" height="50px" />
      </Collapse>
    </Card>
  );
}

export default DriverBundle;