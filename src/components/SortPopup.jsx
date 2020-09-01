import React, { useState, useEffect, useRef } from 'react';

function SortPopup({ items }) {
    const [visiblePopup, setVisiblePopup] = useState(false); // Храним состояние видимости блока сортировки (false = не видно / true = видно на странице)
    const [activeItem, setActiveItem] = useState(0); // Храним состояние активности\выбранности способа сортировки
    const sortRef = useRef(); // Храним ссылку на блок сортировки a.k.a document.querySelector('.sort) только реактивный способ
    const activeName = items[activeItem].name; // Храним название\текст выбранного способа сортировки

    // Функция меняет состояние видимости блока сортировки
    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    // Функция меняет состояние видимости способа сортировки и скрывает блок с способами сортировки
    const onSelectItem = (index) => {
        setActiveItem(index);
        setVisiblePopup(false);
    };

    // Функция контролирует обработку клика по элементам на странице. 
    // При клике на любой элемент кроме элементов входящие в блок сортировки меняется состояние видимости на false (не видимо)
    const handleOutsideClick = (event) => {
        if (!event.path.includes(sortRef.current)) {
            setVisiblePopup(false);
        }
    };

    // При первом рендеренге компонента\документа вешаем обработчик события на документ для смены видимости способов сортировки
    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div ref={sortRef} className="sort"> {/* ref= берет ссылку на элемент страницы и передает в функцию */}
            <div className="sort__label">
                <svg className={visiblePopup ? 'rotated' : ''}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                {/* 
                    При нажатии на блок (ссылку\кнопку) списка сортировок:
                    * исполняется функция смены состояния списка сортировок
                    * меняется название\текст на выбранный способ сортировки 
                */}
                <span onClick={toggleVisiblePopup}>{activeName}</span>
            </div> 
            {/* 
                Проверка: Если состояние true - рендерим способы сортировки (если они были переданы в пропсах)
            делаем видимым блок списка сортировок 
        */}
            {visiblePopup && (
                <div className="sort__popup">
                    <ul>
                        {items &&
                            items.map((obj, index) => (
                                <li
                                    className={activeItem === index ? 'active' : ''}
                                    onClick={() => onSelectItem(index)}
                                    key={`${obj.type}_${index}`}>
                                    {obj.name}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SortPopup;
