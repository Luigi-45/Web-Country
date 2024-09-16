'use client';
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import styles from "@/app/page.module.css";
import { styled } from '@mui/material/styles';
import { gql, useQuery } from '@apollo/client';

const API_KEY = '45919412-b9b196e0740f044b87417a48f';

const GETCOUNTRIES = gql`
    query {
        countries {
            name
            capital
            continent{
                name
            }
            emoji
            languages{
                name
            }
            currencies
            subdivisions{
                name
            }
        }
    }
`;

const CardArray = (array, size) => {
    let list = [];
    for (let i = 0; i < array.length; i += size) {
        list.push(array.slice(i, i + size));
    }
    return list;
};

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiBackdrop-root': {
        backgroundColor: 'transparent',
    },
}));

export function CountryList({ filterText, continentFilter }) {
    const { data, error, loading } = useQuery(GETCOUNTRIES);
    const [images, setImages] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (data && data.countries) {
            const fetchImages = async () => {
                const listImage = {};
                for (const country of data.countries) {
                    const countryName = country.name;
                    try {
                        const response = await fetch(
                            `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(countryName)}&image_type=photo&per_page=3`
                        );
                        const result = await response.json();

                        if (result.hits && result.hits.length > 0) {
                            listImage[countryName] = result.hits[0].webformatURL;
                        } else {
                            console.warn(`Imagenes no encontradas de ${countryName}`);
                        }
                    } catch (error) {
                        console.error(`Error al carga la imagen de ${countryName}`, error);
                    }
                }
                setImages(listImage);
            };
            fetchImages();
        }
    }, [data]);
    

    if (loading) return <p>Cargando información..</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredCountries = data.countries.filter(country => {
        const matchesFilterText = country.name.toLowerCase().includes(filterText.toLowerCase());
        const matchesContinent = continentFilter === 'America'
            ? country.continent.name.toLowerCase().includes('america')
            : continentFilter === '' || country.continent.name === continentFilter;

        return matchesFilterText && matchesContinent;
    });

    const listCard = CardArray(filteredCountries, 3);

    const handleCardClick = (country) => {
        setSelectedCountry(country);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCountry(null);
    };

    return (
        <>
            {listCard.map((list, listIndex) => (
                <div className={styles.d_car} key={listIndex}>
                    {list.map((card, index) => (
                        <Card key={index} sx={{ maxWidth: 345, minWidth: 340, borderRadius: '20px 20px 0 0' }} onClick={() => handleCardClick(card)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={images[card.name] || ''}
                                    alt={card.name}
                                    sx={{ borderRadius: '20px 20px 0 0' }}
                                />
                                <CardContent sx={{ display: "flex", alignItems: 'center', padding: 0, height: "95px" }}>
                                    <div style={{ fontSize: '60px', marginRight: '10px', paddingLeft: "15px" }}>
                                        {card.emoji}
                                    </div>
                                    <div>
                                        <Typography gutterBottom variant="h5" component="div" >
                                            {card.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.capital}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            ))}

            <CustomDialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth sx={{ left: "70%", borderRadius: "20px" }}>
                <DialogTitle>
                    <div style={{ fontSize: '30px', marginRight: '10px', paddingLeft: "15px", display: "flex", gap: "20px" }}>
                        <div style={{ fontSize: '40px', paddingLeft: "15px", display: "flex"}}>
                        {selectedCountry?.emoji}
                        </div>
                        <div style={{ fontSize: '40px', marginRight: '2px', paddingLeft: "2px" }}>
                        {selectedCountry?.name}
                        </div>
                    </div>
                    
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleCloseModal}
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Icon icon="heroicons-solid:x" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedCountry && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <Typography variant="h6" style={{display:"flex", gap:"20px" }}>
                                    <p style={{ color: "#009CFF" }}>Capital:</p> {selectedCountry.capital}
                                </Typography>
                                <Typography variant="h6" style={{display:"flex", gap:"20px" }}>
                                    <p style={{ color: "#009CFF" }}>Continent:</p> {selectedCountry.continent.name}
                                </Typography>

                                <Typography variant="h6" style={{display:"flex", gap:"20px" }}> 
                                    <p style={{ color: "#009CFF" }}>Language:</p> {selectedCountry.languages.map(lang => lang.name).join(', ')}
                                </Typography>
                                <Typography variant="h6" style={{display:"flex", gap:"20px" }}>
                                    <p style={{ color: "#009CFF" }}>Currency:</p> {selectedCountry.currencies}
                                </Typography>
                            </div>
                            <Card sx={{ mt: 2, maxHeight: '200px', overflowY: 'auto', borderRadius: "15px", borderColor: "#009CFF", border: "15px" }}>
                                <CardContent>
                                    <Typography variant="h6">Region:</Typography>
                                    {selectedCountry.subdivisions.map((sub, index) => (
                                        <Typography key={index} variant="body2">- {sub.name}</Typography>
                                    ))}
                                </CardContent>
                            </Card>
                            <img
                                src={images[selectedCountry.name] || ''}
                                alt={selectedCountry.name}
                                style={{ width: '100%', marginTop: '10px' }}
                            />
                        </div>
                    )}
                </DialogContent>
            </CustomDialog>
        </>
    );
}
