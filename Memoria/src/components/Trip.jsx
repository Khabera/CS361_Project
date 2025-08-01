import { Link, useParams } from "react-router"
import React from 'react';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const GetDateFormat = (date) => {
    if(date != null){
        const date1 = new Date(date)
        return date1.toDateString()
    }else{
        return ''
    }
}

const AddItem = (params) => {
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
            const response = await fetch(`http://localhost:54837/api/trips/${params.TripId}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formJson)
            });
            if (response.ok) {
                alert('Trip Item Created');
            } else {
                alert('Failed to create Trip Item');
            }
        } catch (err) {
            alert('Error creating trip.')
        }
        handleClose();
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color='primary.light' onClick={handleClickOpen}>
                Add Item
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                        Add an item to your packing list. You will be able to keep track of the item after adding.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="ItemName"
                            name="ItemName"
                            label="Item Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="ItemDescription"
                            name="ItemDescription"
                            label="Item Description/Notes"
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

const Trip = () => {
    let {TripId} = useParams()
    const [trip, setTrip] = React.useState([]);
    const [tripItems, setTripItems] = React.useState([]);
    const getTrip = async () => {
        const res = await fetch(`http://localhost:54837/api/trips/${TripId}`);
        const res_data = await res.json();
        setTrip(res_data[0]);
    }
    const getTripItems = async () => {
        // Set tries/catches
        const res = await fetch(`http://localhost:54837/api/trips/${TripId}/items`);
        const res_data = await res.json();
        setTripItems(res_data);
    }

    const changePackStatus = async (item) => {
        let url;
        if (item.Packed == 1){
            url = `http://localhost:54837/api/tripitems/${item.ItemID}/unpack`
        } else {
            url = `http://localhost:54837/api/tripitems/${item.ItemID}/pack`
        }
        try {
            console.log(url)
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
            if (response.ok) {
                alert('Item Pack Status Successfully changed');
            } else {
                alert('Error changing pack status');
            }
        } catch (err) {
            alert('Error changing pack status')
        }
        getTripItems();
    }

    React.useEffect(() => {
            getTrip();
            getTripItems();
    }, [])
    return(
        <React.Fragment>
            <AppBar>
                <Link to={{pathname: `/`}}>
                    <IconButton color='primary.light'>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <IconButton>
                    <DeleteForeverIcon color='primary.light'/>
                </IconButton>
                
            </AppBar>
            <Typography
                color="primary.light"
                variant='h3'>
                {trip.Name}
            </Typography>
            <Typography
                color="secondary.light"
                variant='h6'>
                {GetDateFormat(trip.StartDate)} through {GetDateFormat(trip.EndDate)}
            </Typography>
            <Typography
                color="secondary.light"
                variant='h6'>
                {trip.Description}
            </Typography>
            <Table sx={{ color: 'white' }}>
                <TableHead >
                    <TableCell sx={{ color: 'white' }}>Item Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Item Description</TableCell>
                    <TableCell sx={{ color: 'white' }}>Packed?</TableCell>
                </TableHead>
                <TableBody>
                    {tripItems.map((item) => (
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>{item.ItemName}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{item.ItemDescription}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{item.Packed ? 
                                <IconButton color='success'
                                onClick={() => changePackStatus(item)}>
                                    <CheckIcon />
                                </IconButton> : 
                                <IconButton color='warning'
                                onClick={() => changePackStatus(item)}> 
                                    <CloseIcon />
                                </IconButton>}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell sx={{ color: 'white' }}>
                            <AddItem TripId={TripId}/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </React.Fragment>
    )
}

export default Trip