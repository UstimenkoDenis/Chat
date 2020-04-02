import React, { Component } from 'react';

import './post-list-item.css'

export default class PostListItem extends Component{
   

    render () {
        const  {label, onDelete, onToggleImportant, onToggleLiked, important, like} = this.props;
      
        let classNames = 'app-list-item d-flex justify-content-between' 
        if (important) {
            classNames +=' important'; 
        }
        if (like) { // true
            classNames +=' like'; 
        }

        return (
            <div className = {classNames}>
                <span className = "app-list-item-label"
                      onClick = {onToggleLiked}>
                    {label}
                </span>
                <div className = "d-flex justify-content-center align-items-center">
                    <button 
                        type = "button"
                        className = "btn-star btn sm"
                        onClick = {onToggleImportant}> 
                        <i className = "fa fa-star"></i>
                    </button>
                   {/* Здесь когда мы кликаем на иконку мусорной карзины передается событие в наш postList - там мы принимаем обрабатываем 
                   и передаем далее в app.js , в котором мы убираем нужный элемент из данных data и react увидит изменение и перерисует */}
                    <button 
                        type = "button"
                        className = "btn-trash btn sm"
                        onClick = {onDelete}>  {/* этот обработчик событий будет приходить к нам из props*/}

                        <i className = "fa fa-trash-o"></i>
                    </button>
                    <i className = "fa fa-heart"></i>

                </div>
            </div>
        )
    }
}

