'use client';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';

export function CountryFilters({ onFilterChange, filterText, onContinentChange, continentFilter }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContinent, setSelectedContinent] = useState(continentFilter);
    const modalRef = useRef(null);

    const ClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', ClickOutside);
        return () => document.removeEventListener('mousedown', ClickOutside);
    }, []);

    useEffect(() => {
        setSelectedContinent(continentFilter);
    }, [continentFilter]);

    const handleModal = () => {
        setModalOpen(true);
    };

    const FilterChange = (event) => {
        onFilterChange(event.target.value);
    };

    const handleContinentClick = (continent) => {
        if (selectedContinent === continent) {
            setSelectedContinent('');
            onContinentChange('');
        } else {
            setSelectedContinent(continent);
            onContinentChange(continent);
        }
    };

    return (
        <Box sx={{ position: 'relative', width: '600px' }}>
            <FormControl variant="outlined" sx={{ width: '100%' }}>
                <InputLabel htmlFor="search-input" sx={{ backgroundColor: '#fff', paddingX: '4px' }}>
                    País
                </InputLabel>
                <OutlinedInput
                    id="search-input"
                    value={filterText}
                    onChange={FilterChange}
                    onFocus={handleModal}
                    onBlur={handleModal}
                    fullWidth
                    placeholder="Escriba el país que desee"
                    endAdornment={
                        <InputAdornment position="end" sx={{ backgroundColor: '#009CFF', color: "white", display: "flex", height: "35px", width: "140px", borderRadius: '20px', cursor: 'pointer' }}>
                            <Icon icon="tdesign:search" style={{ position: "relative", left: "12px", fontSize: "20px" }} />
                            <p style={{ position: "relative", left: "20px" }}>Buscar</p>
                        </InputAdornment>
                    }
                    sx={{
                        borderRadius: '20px',
                        border: 'none',
                        boxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
                        WebkitBoxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
                        MozBoxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
                    }}
                />
            </FormControl>
            {modalOpen && (
                <Box
                    ref={modalRef}
                    sx={{
                        position: 'absolute',
                        top: '72px',
                        left: 0,
                        width: '75%',
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px',
                        padding: '16px',
                        zIndex: 1,
                        boxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
                        WebkitBoxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
                        MozBoxShadow: '1px 2px 5px -1px rgba(0,0,0,0.48)',
                    }}
                >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {['Europe', 'America', 'Asia', 'Oceania', 'Africa'].map((continent) => (
                            <Box
                                key={continent}
                                sx={{
                                    padding: '8px 16px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                    backgroundColor: selectedContinent === continent ? '#e0e0e0' : 'white',
                                }}
                                onClick={() => handleContinentClick(continent)}
                            >
                                {continent}
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
