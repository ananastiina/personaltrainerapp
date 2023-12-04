import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function AddCustomer(props) {

    // Statet
    const [customer, SetCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''});
    const [open, setOpen] = useState(false); // is dialog open

    //functions
    const handleClose = (event, reason) => { //close dialog
        if(reason != 'backdropClick')
            setOpen(false);
    }

    const handleInputChanged = (event) => {
        SetCustomer({...customer, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false); // suljetaan dialogi-ikkuna
    }

    return (
        <>
        <Button size='large'
        onClick={() => setOpen(true)}>Lisää asiakas</Button>
        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>Uusi asiakas</DialogTitle>
            <DialogContent>
                <h3>Etu- ja sukunimi:</h3>
                <TextField
                label='Etunimi'
                name='firstname'
                value={customer.firstname}
                onChange={handleInputChanged}>  
                </TextField> 
                <TextField
                label='Sukunimi'
                name='lastname'
                value={customer.lastname}
                onChange={handleInputChanged}>  
                </TextField><br/>
                <h3>Katuosoite:</h3>
                <TextField
                label='Katuosoite'
                name='streetaddress'
                value={customer.streetaddress}
                onChange={handleInputChanged}>  
                </TextField><br/>
                <h3>Postinumero ja paikkakunta:</h3>
                <TextField
                label='Postinumero'
                name='postcode'
                value={customer.postcode}
                onChange={handleInputChanged}>  
                </TextField>
                <TextField
                label='Paikkakunta'
                name='city'
                value={customer.city}
                onChange={handleInputChanged}>  
                </TextField><br/>
                <h3>Sähköpostiosoite:</h3>
                <TextField
                label='Sähköposti'
                name='email'
                value={customer.email}
                onChange={handleInputChanged}>  
                </TextField><br/>
                <h3>Puhelinnumero:</h3>
                <TextField
                label='Puhelinnumero'
                name='phone'
                value={customer.phone}
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