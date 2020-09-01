import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Header } from './components';
import { Home, Cart } from './pages';
import { setPizzas } from './redux/actions/pizzas'; // функция которая принимает 1 аргумент (объект с пиццами) и создает обьект для экшена.

// Функциональный компонент
function App() {
    // Инициализируем хук который возвращает ссылку на dispatch функцию из Redux
    const dispatch = useDispatch();

    // Происходит действие\эффект только один раз при первом рендере из за пустого массива который передается вторым аргументом
    useEffect(() => {
        /*
            Выполняем гет запрос и когда данные будут получены, дожидаемся получения этих данных (.then(({ data })).
            Когда\если эти данные будут получены - выполниться функция dispatch (экшен).
            Экшен (dispatch) добавит полученные данные (объект из setPizzas) в Redux (state/хранилище).
         */
        axios.get('http://localhost:3000/db.json').then(({ data }) => {
            dispatch(setPizzas(data.pizzas));
        });
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
            </div>
        </div>
    );
}

export default App;

// Классовый компонент
// class App extends React.Component {
//     componentDidMount() {
//         axios.get('http://localhost:3000/db.json').then(({ data }) => {
//             this.props.setPizzas(data.pizzas);
//         });
//     }

//     render() {
//         return (
//             <div className="wrapper">
//                 <Header />
//                 <div className="content">
//                     <Route exact path="/" render={() => <Home items={this.props.items} />} />
//                     <Route exact path="/cart" component={Cart} />
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         items: state.pizzas.items,
//         filters: state.filters,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setPizzas: (items) => dispatch(setPizzas(items)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
