import React, {Component} from 'react';
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form'

import './app.css'; 


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: "Going to learn React", important: true, like: false, id: 1}, 
                {label: "That is so good", important: false, like: false, id: 2},
                {label: "I need a breek...", important: false,like: false, id: 3}
            ],
            term: '',
            filter: 'all' // будет говорить как именно отфильтровать посты
        };
        // здесь привязываем только обработчики событий!!!!
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this); 
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4 ;
    }
    searchPost(items, term){ // 
        if (term.length === 0) { // если пользователь ничего не вводил или стер
            return items // просто возвращаем наши данные
        } 
        return items.filter((item)=>{
            return item.label.indexOf(term) > -1 // в каждом элементе мы будем находить свойство label и внутри этого свойства будем
            // находить то что ввел пользователь. Если мы этого не нашли то мы получим -1 а нас интересуют все посты как раз которые 
            // ввел пользователь
            // Таким образом функция filter будет возвращать нам те посты которых будет содержаться то что ввел пользователь
        })
    }
    onUpdateSearch(term) { // принимает строку поиска
        this.setState({term}); // меняем наш term
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }


    // сюда попадет массив который возвратит функция searchPost() и  переменную filter 
    filterPost(items, filter) { // функция вернет нам массив данных у которых like true
        if(filter === 'like') {
            return items.filter(item=>item.like) // получим все те элементы которых like будет true 
        } else {  // если наш фильтр будет другой (в нашем случае это будет all )
            return items; // все элементы которые попали в нашу функцию
        }

    }
    deleteItem(id) {
        this.setState(({data}) => {

            const index = data.findIndex(elem => elem.id === id)
            const newArray = [...data.slice(0, index), ...data.slice(index+1)]; 

            return {
                data: newArray
            }
        });
    }
       
    addItem(body) { 
        
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {  
                const newArr = [...data, newItem];
                
                return {
                    data: newArr
                }
        
        });
    }
// наш компонент postList будет принимать еще два обработчика событий
// приставка on в названиях функций говорит что это обработчики событий



// ...................................Домашняя работа

    onToggleImportant(id) {   // id -  чтобы знать какой пост был отмечен
      this.makeArray(id,'important')  
    }

    onToggleLiked(id) { // id -  чтобы знать какой пост был отмечен
        this.makeArray(id,'like')  ;    
     }
 
    makeArray(id, property) {
        return (
            this.setState(({data})=>{ 
       
                const index = data.findIndex(elem => elem.id === id); // если наш id совпадает с тем который был передан нашей функции
                const old = data[index];
                const newItem = property==='like'? {...old, like: !old.like}:{...old, important: !old.important}
                const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];
               
                return {
                    data: newArr
                }
            })
        );
    }
/////////////////////////////////////////////////////////////////////////////////////////////
    
    render () {
        const {data, term, filter  } = this.state // вытаскиваем data
        const liked = data.filter(item => item.like).length; //true (получим массив и количество элементов узнаем через length)
        const allPosts = data.length;

        // const visiblePosts = this.searchPost(data, term); //теперь мы основали наши видимые посты на основе того что ввел пользователь
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter); // обернули в функцию
// filterPost имеет два аргумента первый будет наш массив который возвращает this.searchPost(), а второй - наш фильтр filter  


        // передадим эти переменные в AppHeader
        return (
            <div className = "app">  
                <AppHeader
                        allPosts = {allPosts}
                        liked = {liked}
                />
                <div className = "search-panel d-flex">  
                    <SearchPanel
                        onUpdateSearch = {this.onUpdateSearch}/>

                    <PostStatusFilter
                                filter = {filter}
                                onFilterSelect = {this.onFilterSelect}/>
                </div>
                <PostList 
                        // posts = {this.state.data}
                        posts = {visiblePosts } // теперь мы берем не все посты а толко те которые необходимо отобразить на странице

                        onDelete = {this.deleteItem }  
                        onToggleImportant = {this.onToggleImportant}  //эта функция - отвечает за переключения state.important который будет у нас в каждом компоненте 
                        onToggleLiked = {this.onToggleLiked}    // эта функция будет отвечать за переключение state.like 
                        />  
                <PostAddForm
                        onAdd = {this.addItem}/>
            </div>
        );
    }
 
}