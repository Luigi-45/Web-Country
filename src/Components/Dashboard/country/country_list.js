import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import styles from "@/app/page.module.css";

const cardData = [
    {
        title: 'Lizard',
        description: 'Europe',
        image: '/static/images/cards/contemplative-reptile.jpg',
        alt: 'green iguana',
        extraImage: '/static/images/cards/small-lizard.jpg'
    },
    {
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: '/static/images/cards/contemplative-reptile.jpg',
        alt: 'green iguana'
    },
    {
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: '/static/images/cards/contemplative-reptile.jpg',
        alt: 'green iguana'
    },
    {
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: '/static/images/cards/contemplative-reptile.jpg',
        alt: 'green iguana'
    },
    {
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: '/static/images/cards/contemplative-reptile.jpg',
        alt: 'green iguana'
    },
    {
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: '/static/images/cards/contemplative-reptile.jpg',
        alt: 'green iguana'
    },

];

const CardArray = (array, size) => {
    let list = [];
    for (let i = 0; i < array.length; i += size) {
        list.push(array.slice(i, i + size));
    }
    return list;
};

export function CountryList() {

    const listCard = CardArray(cardData, 3);

    return (
        <>
            {listCard.map((list, listIndex) => (
                <div className={styles.d_car} key={listIndex}>
                    {list.map((card, index) => (
                        <Card key={index} sx={{ maxWidth: 345, minWidth: 340 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={card.image}
                                    alt={card.alt}
                                />
                                <CardContent sx={{ display: "flex", alignItems: 'center' }} >
                                    <CardMedia
                                        component="img"
                                        image={card.extraImage}
                                        alt="extra image"
                                        sx={{ width: 100, height: 0, marginRight: 2 }}
                                    />
                                    <div style={{ flexGrow: 1, minHeight: 120 }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {card.description}
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
