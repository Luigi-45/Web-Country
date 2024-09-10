import React from 'react';
import Card from '@mui/material/Card';
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
            defaultValue=""
            fullWidth
            placeholder="Ingresar pais"
            startAdornment={
                <InputAdornment position="start">
                    <Icon icon="icon-park-twotone:search" />
                </InputAdornment>
            }
            sx={{ maxWidth: '500px' }}
        />

    );
}
