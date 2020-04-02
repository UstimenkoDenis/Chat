import React, {Component} from 'react';

import './search-panel.css';


export default class SearchPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }
// тут сначала записываем содержимое нашего инпута в state  SearchPanel, а потом выполняем функцию onUpdateSearch 
// которую мы получили в props из app.js  в нее мы помещаем аргумент term с содержанием input 
    onUpdateSearch(e) {
        const term = e.target.value;
        this.setState({term}); // здесь данный state так же не зависит от предыдущего поэтому callback не нужна
                            // тут новый синтаксис это тоже самое что написать term: term
        this.props.onUpdateSearch(term); // здесь не рекурсия!! Эту функцию мы пропишем в app.js потому что нам необходимо обновить
        // state не только здесь но и в нашем компоненте app 
    } 


    render() {
        return (
            <input
                className = "form-control search-input"
                type = "text"
                placeholder = "Поиск по записям"
                onChange = {this.onUpdateSearch} // эта функция будет следить за тем что будет вводить пользователь и изменять state
            />
        )
    }
    
}