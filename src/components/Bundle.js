import React from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import MyButton from './Button';

function Bundle(ride) {
    const time = new Date(ride.ride.time)
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return (
        <div>
            <Card variant="outlined" style={{ height: "110px", borderWidth: "0px", color: "white", background: "linear-gradient(to right, #381494, #592ec7)", marginBottom: "8px", paddingInline: "20px"}}>
                <Typography variant="h6" align="center">
                    <b>{ride.ride.destination.name}</b>
                </Typography>
                <Typography style={{paddingLeft: "10%"}}>
                    Taxi picks up the first passenger at <b>{hours}:{minutes}</b>
                </Typography>
                <MyButton buttonText="Join ride" backgroundColor="#555555" margin="auto" width="100%" />
            </Card>
        </div>
    );
}

export default Bundle;