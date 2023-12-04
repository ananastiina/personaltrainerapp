import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from '@mui/material';
import { Snackbar } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";


export default function Customers() {

    // state variables
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    // columns for customers ag-grid
    const columns = [
        {headerName: 'Etunimi', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Sukunimi', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Katuosoite', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postinumero', field: 'postcode', sortable: true, filter: true},
        {headerName: 'Paikkakunta', field: 'city', sortable: true, filter: true},
        {headerName: 'Sähköposti', field: 'email', sortable: true, filter: true},
        {headerName: 'Puhelinnumero', field: 'phone', sortable: true, filter: true},
        {
            cellRenderer: params =>
            <Button size='small' color="error" onClick = {() => deleteCustomer(params)}>
                Poista
            </Button>,
            width: 120
        },
        {
            cellRenderer: params => <EditCustomer params={params} updateCustomer={updateCustomer}/>,
            width: 150
        },
        {
            cellRenderer: params => <AddTraining params={params} addTraining={addTraining}/>,
            width: 150
        },
    ]

    useEffect(() => getCustomers(), [])

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    const getCustomers = () => {
        fetch(REST_URL)
        .then(response => response.json())
        .then(responseData => { 
            console.log(responseData);
            setCustomers(responseData.content)
            
        })
        .catch(error => console.error(error));
    }

    // Delete customer
    const deleteCustomer = (params) => {
        if (window.confirm('Oletko varma?')) {
        fetch(params.data.links[1].href, {method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                setMsg('Asiakas poistettu onnistuneesti');
                setOpen(true);
                getCustomers();
            } else {
                alert('Jokin meni vikaan!');
            }
        })
        .catch(error => console.error(error));
    }}

    // lisää asiakas
    const addCustomer = (customer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                getCustomers();
             } else {
                alert('Jokin meni vikaan');
             }
        })
        .catch(err => console.error(err))
    }

    // Muokkaa asiakasta
    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (response.ok) {
                setMsg("Asiakasta muokattu onnistuneesti.");
                setOpen(true);
                getCustomers();
             } else {
                alert('Jokin meni vikaan');
             }
        })
        .catch(err => console.error(err))
    }


    const addTraining = (training) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) {
                setMsg("Lisätty onnistuneesti.");
             } else {
                alert('Jokin meni vikaan');
             }
        })
        .catch(err => console.error(err))
    }


    return (
        <>
        <h2>Asiakkaat</h2>
        <AddCustomer addCustomer={addCustomer}/>

        <div className="ag-theme-material"
        style={{height:'700px', width:'100%', margin: 'auto'}}>
            <AgGridReact 
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}></AgGridReact>

            <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={()=> setOpen(false)}
            message={msg}></Snackbar>

        </div>
        </>
    );
}