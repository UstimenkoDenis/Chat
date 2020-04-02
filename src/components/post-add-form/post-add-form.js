import React, {Component} from 'react';

import './post-add-form.css';
  
export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

            text: ''
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(e) {
        // console.log(e.target.value);
       this.setState({ // здесь мы можем не передавть внутрь callback функцию потому что здесь наш state не зависит от предыдущего
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault(); // позволяет отменить стандартное поведение браузера и стандартную отправку формы
        this.props.onAdd(this.state.text); // выполняем функцию addItem из app.js, которая пришла к нам в props со свойствм onAdd
        this.setState({
            text: ''
        }); // - очишаем наш imput при отправке нашей формы
    }

    render () {
        return (
            <form 
                className = "bottom-panel d-flex"
                onSubmit = {this.onSubmit}>
                <input
                    type = "text"
                    placeholder = " Очем вы думаете сейчас?"
                    className  = "form-control new-post-label"
                    onChange = {this.onValueChange}
                    value = {this.state.text} // таким образом при повторном render в наше value попадет то значение которое сейчас 
                                              // в нашем state. Теперь этот компонент у нас контролируемый - у нас есть связь между state
                                              // и input 
                />
                <button
                    type = "submit"
                    className = "btn btn-outline-secondary">
                    Добавить
                </button>
            </form>
        )//// onClick нам уже не нужен мы теперь будем отслеживать саму отправку формы
    }
         
}
// Мы на нашем input все время отслеживаем что происходит и помещаем в наш state text из input 
// Когда пользователь нажмет кнопку  - форма отправится и  унас будет создаваться новый пост, создается он при помощи функции onAdd
// которая во внутрь своего body помещает state который у нас в текущий момент


// Прооверяем и ничего не происходит так как броузер посьоянно обновляет страницу. Дело в том что если мы работаем с таким
// элементом как форма мы должны отменять стандартное поведение браузера

// для этого мы должны передать в функцию объект события e
// и написать e.preventDefault()
// onSubmit(e) {
  //  e.preventDefault()
//     this.props.onAdd(this.state.text);
// }

// теперь сделаем чтобы input очищался после введения
// Познакомимся с таким понятием как - контролируемые элементы
// Наш imput при помощи того что пользователь в него что то вводит - контролирует наше состояние элемента. Но кто же контролирует
// наш input ?  то есть сейчас у нас нет обратной связи между нашим элементом и нашим состоянием в нашем компоненте - такой элемент
// называется - неконтролируемым, потому что состояние ни как не может им управлять. В reacte такими компонентами могут быть
// input, textArea и select  

