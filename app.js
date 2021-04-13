new Vue({
    el: '#app',
    data: {
        newTodo: "",
        editCatch: "",
        id: 4,
        filter: "all",
        search: "",
        searchFeature: true,   
        todos: [
            {
                id: 1,
                task: "Homeword",
                done: false,
                edited: false
            },
            {
                id: 2,
                task: "work out",
                done: false,
                edited: false
            },
            {
                id: 3,
                task: "Do work",
                done: false,
                edited: false
            }
        ]
    },
    directives: {
        focus: {
            inserted(el){
                el.focus()
            }
        }
    },
    methods: {
            addData(){
                if(this.newTodo.trim() === ''){
                    return
                }
                let todo={
                    id: this.id,
                    task: this.newTodo,
                    allComplete: true,
                    done: false,
                    edited: false
                }
                this.todos.push(todo);
                this.newTodo="";
                this.id++;
            },
            removeData(index){
                this.todos.splice(index, 1);
            },
            completeData(todo){
                return todo.done= !todo.done;
            },
            editTodo(todo){
                this.editCatch=todo.task;
                this.todos.forEach(todo => {
                    todo.edited = false;
                });
                return todo.edited=true;
            },
            editDone(todo){
                if(todo.task.trim() === ''){
                    todo.task=this.editCatch; 
                }
                return todo.edited=false;
            },
            restoreData(todo){
                todo.task=this.editCatch;
                todo.edited=false;
            },
            allCompleteTask(){
                if(this.remainderToDo === 0){
                    this.allComplete = true;
                }else{
                    this.allComplete = false;
                }
                this.todos.forEach(todo =>{
                    todo.done=!this.allComplete;
                })
            },
            clearComplete(){
                this.todos = this.todos.filter(todo => !todo.done); 
            }
    },
    computed: {
        remainderToDo() {
            return this.todos.filter(todo => !todo.done).length;
        },
        checkComplete(){
            return this.remainderToDo === 0;
        },
        filterTodo(){
            if(this.filter  === 'all'){
                return this.todos;
            }
            if(this.filter  === 'active'){
                return this.todos.filter(todo => !todo.done);
            }
            if(this.filter  === 'complete'){
                return this.todos.filter(todo => todo.done);
            }
        },
        showClearComplete(){
            return this.todos.filter(todo => todo.done).length > 0;
        },
        searchTodos(){
            if(this.search.trim() !== ''){
                return this.filterTodo.filter(todo=>todo.task.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
            }
            return this.filterTodo;
        }
    }
})