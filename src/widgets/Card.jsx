import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propType from 'prop-types';
import styles from './Card.module.css';

function Card(props) {
    let Img = props.img;
    let title = props.title;
    let description = props.description;
    let address = props.address;

    // let [title, setTitle] = useState("Card Title");


    // const updateTitle = (e) => {
    //     setTitle("New Title");
    //     // alert('Card Clicked');

    // }
    const handleClick = (e) => {
        // alert('Card Clicked');
        console.log('Card Clicked');
        // console.log(e);
        // e.target.textContent = "card clicked";
    }

    return (
        <div className={styles.card} onClick={handleClick}>
            <img className={styles.cardImg} src={Img.src} alt={Img.alt}></img>
            <h2 className={styles.cardTitle} ><Link to={address}>{title}</Link></h2>
            <div className={styles.cardText}>
                {description.map((desc, index) => (
                    <p key={index}>{desc}</p> // 逐个渲染每个字符串为段落
                ))}
            </div>
        </div>
    );
}
Card.propTypes = {
    title: propType.string,
    description: propType.oneOfType([
        propType.string,
        propType.arrayOf(propType.string) // 允许是字符串数组
    ]),
    address: propType.string,
}

Card.defaultProps = {
    title: 'Card Title',
    description: ['Card Description'],
    address: '#',
    img: {
        src: 'https://via.placeholder.com/150',
        alt: 'Card Image'
    }
}

export default Card;