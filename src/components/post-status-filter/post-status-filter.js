import React, {Component} from 'react';

import './post-status-filter.css'

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'}, 
            {name: 'like', label: 'Понравилось'} // теперь даже если кнопок станет больше намного легче станет их формировать

        ] // здесь name будет наш уникальный ключ
    }
    render () {
        const {filter, onFilterSelect} = this.props;
        const buttons = this.buttons.map(({name, label})=>{
            const active = filter === name ;// из props filter мы получаем состояние filter в app.js и сравниваем с name 
            // в каждом элементе и если они совпадут то это выражение будет true и  active будет true для данного элемента
            const clazz = active ? 'btn-info' : 'btn-outline-secondary';
            return ( // когда у нас будут формироваться кнопки - у нас создастся обработчик события который будет 
                // передавать name - уникальный ключ (либо all либо like  или другой если у нас будет больше кнопок)
                 <button 
                    key = {name} 
                    type ="button"  
                    className = {`btn ${clazz}`}
                    onClick = {()=>onFilterSelect(name)} >
                    {label}</button>
            )
        });
        return (
            <div className = "btn-group" >
                    {buttons}
            </div>
        )
    }
}
