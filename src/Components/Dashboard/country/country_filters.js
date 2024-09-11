import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Icon } from '@iconify/react';


export function CountryFilters({ onFilterChange, filterText }) {
    const handleFilterChange = (event) => {
        onFilterChange(event.target.value);
    };

    return (

        <OutlinedInput
            value={filterText}
            onChange={handleFilterChange}
            fullWidth
            placeholder="Ingresar pais"
            endAdornment={
                <InputAdornment position="center" sx={{ backgroundColor: '#009CFF', color: "white", display: "flex", height: "35px", width: "140px", borderRadius: '20px'}}>
                    <Icon icon="tdesign:search" style={{ position:"relative",left: "12px", fontSize: "20px" }}/>
                    <p style={{ position:"relative",left: "20px" }}>Buscar</p>
                </InputAdornment>
            }
            sx={{
                maxWidth: '500px',
                borderRadius: '20px',
                border: 'none',
                boxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
                WebkitBoxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
                MozBoxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
            }}
        />


    );
}
