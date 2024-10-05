import propType from 'prop-types';

import Card from './Card'
import styles from './CardCollection.module.css'

export default function CardCollection(props) {
    const carditems = props.items;
    //使用箭头函数的隐式返回： 如果你的 map 回调函数只有一行代码且返回 JSX，
    //可以使用圆括号包裹它进行隐式返回
    const cards = carditems.map((item, index) => (
        <Card key={index} img={item.img} title={item.title} description={item.description} address={item.address}/>
    ));
    
    return (
        <div id="card-collection" className={styles.cardCollectionContainer}>
            <div className={styles.cardCollection}>
                {cards}
            </div>
        </div>
    )
 }