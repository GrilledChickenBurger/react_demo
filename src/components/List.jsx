// import propType from 'prop-types';

function List(props) {
    const  fruits  = props.items;


    const lowcalFruits = fruits.filter(fruit => fruit.calories >= 100);
    // fruits.sort((a,b)=>a.name.localeCompare(b.name));
    // fruits.sort((a,b)=>b.name.localeCompare(a.name));
    fruits.sort((a, b) => a.calories - b.calories);
    
    const listItems = lowcalFruits.map((fruit, index) =>
        <li key={index}>
            {fruit.name}&nbsp;-&nbsp;{fruit.calories}
        </li>
    );
    return (
        <ol>
            {listItems}
        </ol>
    );
}

export default List;