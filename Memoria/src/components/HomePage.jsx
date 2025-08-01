import { Button, DialogContentText, Divider, ListItemText, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';

const trips = [
    {
        tripID: 1,
        location: "Yosemite, California",
        title: "Example Trip 1",
        description: "Example Description 1",
        notes: ["Remember to print the camping permit",
            "Bearvault is going to be required for this trip."
        ]
    }

]

const AddTrip = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        try {
            const response = await fetch('http://localhost:54837/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formJson)
            });
            if (response.ok) {
                alert('Trip Created');
            } else {
                alert('Failed to create Trip');
            }
        } catch (err) {
            alert('Error creating trip.')
        }
        handleClose();
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color='primary.light' onClick={handleClickOpen}>
                Add New Trip
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Trip</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                        Add a Trip to your catalog. After adding, more features will be available to customize.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Trip Title"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="startdate"
                            name="startdate"
                            label="Start Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                        />
                        <TextField
                            autoFocus
                            required
                            id="enddate"
                            name="enddate"
                            label="End Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="Brief Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline={true}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

const GetDateFormat = (date) => {
    if(date != null){
        const date1 = new Date(date)
        return date1.toDateString()
    }else{
        return ''
    }
}

const HomePage = () => {
    const [trips, setTrips] = React.useState([]);
    const getTrips = async () => {
        const res = await fetch('http://localhost:54837/api/trips');
        const res_data = await res.json();
        console.log(res_data)
        setTrips(res_data);
    }
    React.useEffect(() => {
        getTrips()
    }, [])

    return (
        <>
            <List>
                {trips.map((trip) => (
                    <React.Fragment>
                        <Link to={{pathname: `/trips/${trip.TripID}`}}>
                            <ListItem>
                                <ListItemText
                                    primary={<>
                                        <Typography
                                            component="span"
                                            variant="h6"
                                            color='primary.light'
                                        >
                                            {trip.Name}
                                        </Typography>
                                    </>}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color='white'>
                                                {GetDateFormat(trip.StartDate)} - {GetDateFormat(trip.EndDate)}
                                            </Typography>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color='secondary.light'>
                                                -- {trip.Description}
                                            </Typography>
                                        </>
                                    } />
                            </ListItem>
                        </Link>
                        <Divider variant="middle" component="li" light='true' />
                    </React.Fragment>
                ))}
            </List>
            <AddTrip />
        </>
    )
}

export default HomePage