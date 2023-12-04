import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from '@mui/material';
import { Snackbar } from "@mui/material";
import moment from "moment";

export default function Trainings() {

    // state variables
    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    // columns for customers ag-grid
    const columns = [
        {
            headerName: 'Ajankohta', field: 'date', sortable: true, filter: true, cellRenderer: (data) => {
            return moment(data.value).format('DD/MM/YYYY HH:mm')}
        },
        {headerName: 'Kesto (minuutteina)', field: 'duration', sortable: true, filter: true},
        {headerName: 'Aktiviteetti / treeni', field: 'activity', sortable: true, filter: true},
        {headerName: 'Etunimi', field: 'customer.firstname', sortable: true, filter: true},
        {headerName: 'Sukunimi', field: 'customer.lastname', sortable: true, filter: true},
        {
            cellRenderer: params =>
            <Button size='small' color="error" onClick = {() => deleteTraining(params)}>
                Delete
            </Button>,
            width: 120
        }
    ]

    useEffect(() => getTrainings(), [])

    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    const getTrainings = () => {
        fetch(REST_URL)
        .then(response => response.json())
        .then(responseData => { 
            console.log(responseData);
            setTrainings(responseData)
            
        })
        .catch(error => console.error(error));
    }


    // Poista treeni
    const deleteTraining = (params) => {
        if (window.confirm('Oletko varma?')) {
        fetch(params.data.id, {method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                setMsg('Treeni poistettu onnistuneesti');
                setOpen(true);
                getTrainings();
            } else {
                alert('Jotain meni vikaan!');
            }
        })
        .catch(error => console.error(error));
    } }


    return (
        <>
        <h2>Treenit</h2>

        <div className="ag-theme-material"
        style={{height:'700px', width:'80%', margin: 'auto'}}>
            <AgGridReact 
            rowData={trainings}
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