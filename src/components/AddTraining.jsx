import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function AddTraining(props) {

    // Statet
    const [training, SetTraining] = useState({ date: null, duration: '', activity: '' , customer: ''});
    const [open, setOpen] = useState(false); // is dialog open

    //functions
    const handleClose = (event, reason) => { //close dialog
        if (reason != 'backdropClick')
            setOpen(false);
    }

    const handleInputChanged = (event) => {
        SetTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleDateChanged = (event) => {
        SetTraining({ ...training, date: event.toISOString()});
    }

    const linkCustomer = () => {
        SetTraining({...training, customer: props.params.data.links[1].href})
    }


    const handleSave = () => {
        props.addTraining(training);
        console.log(training.customer);
        setOpen(false); // suljetaan dialogi-ikkuna
    }

    // return
    return (
        <>
            <Button size='large'
                onClick={() => {
                    setOpen(true);
                    linkCustomer();
                }}>Lisää treeni</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Uusi treeni</DialogTitle>
                <DialogContent>
                    <h3>Päivämäärä ja aika:</h3>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                            label="Päivämäärä ja aika" 
                            name='date' 
                            value={training.date}
                            onChange={handleDateChanged}/>
                    </LocalizationProvider>
                    
                    <h3>Kesto (minuutteina):</h3>
                    <TextField
                        label='Kesto (minuutteina)'
                        name='duration'
                        value={training.duration}
                        onChange={handleInputChanged}>
                    </TextField><br />
                    <h3>Treeni / aktiviteetti:</h3>
                    <TextField
                        label='Aktiviteetti'
                        name='activity'
                        value={training.activity}
                        onChange={handleInputChanged}>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}>Sulje</Button>
                    <Button
                        onClick={handleSave}>Tallenna</Button>
                </DialogActions>
            </Dialog>
        </>

    );
}