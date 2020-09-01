import React from 'react';
import { useSelector } from 'react-redux';
import { Categories, SortPopup, PizzaBlock } from '../components';

function Home() {
    /*
        useSelector принимает в виде аргумента функцию.
        Функция (useSelector) извлекает из Redux (state\хранилища) свойство pizzas используя деструктуризацию.
        Теперь константа items возвращает\хранит значение (массив) в котором хранятся все пиццы.
    */
    const items = useSelector(({ pizzas }) => pizzas.items);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClickItem={(name) => console.log(name)} 
                    items={['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']}
                />

                <SortPopup
                    items={[
                        { name: 'популярности', type: 'popular' },
                        { name: 'цене', type: 'price' },
                        { name: 'алфавиту', type: 'alphabet' },
                    ]}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {items && items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </div>
    );
}

export default Home;
