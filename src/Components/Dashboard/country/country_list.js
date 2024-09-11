'use client';
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import styles from "@/app/page.module.css";
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

export function CountryList() {
    const { data, error, loading } = useQuery(GETCOUNTRIES);
    const [images, setImages] = useState({});

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
                        if (result.hits.length > 0) {
                            listImage[countryName] = result.hits[0].webformatURL;
                        }
                    } catch (error) {
                        console.error(`Error al cargar la imagen ${countryName}`, error);
                    }
                }
                setImages(listImage);
            };
            fetchImages();
        }
    }, [data]);

    if (loading) return <p>Cargando información..</p>;
    if (error) return <p>Error: {error.message}</p>;

    const listCard = CardArray(data.countries, 3);

    return (
        <>
            {listCard.map((list, listIndex) => (
                <div className={styles.d_car} key={listIndex}>
                    {list.map((card, index) => (
                        <Card key={index} sx={{ maxWidth: 345, minWidth: 340, borderRadius: '20px 20px 0 0' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={images[card.name] || ''}
                                    alt={card.alt}
                                    sx={{ borderRadius: '20px 20px 0 0' }}
                                />
                                <CardContent sx={{ display: "flex", alignItems: 'center', padding: 0, height: "95px" }} >
                                    <div style={{ fontSize: '60px', marginRight: '10px', paddingLeft: "15px" }}>
                                        {card.emoji}
                                    </div>
                                    <div style={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {card.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {card.continent.name}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            ))}
        </>
    );
}
