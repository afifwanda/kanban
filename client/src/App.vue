<template>
<div>
    <Navbar @registerToggle="registerToggle" @loginToggle="loginToggle" @logoutToggle="logout" :signOutToggle="signOutToggle" :signUpToggle="signUpToggle" :signInToggle="signInToggle"></Navbar>

    <registerloginBox :register_box="register_box" @register="register" @loginButton="loginButton"></registerloginBox>
    <registerloginBox :login_box="login_box"  @login="login"  @registerButton="registerButton"></registerloginBox>


      <div class="container kanban" id="taskList" v-if="kanban_box">
        <br>
        <h4>Your Task List</h4>
        <br>
        <div class="addtask">
            <input type="button" class="submit" value="Add Task" v-on:click.prevent="addButton">
        </div>
        <div class="row" >

            <div class="col-3 backlog">
                <div class="mr-1 p-1 color-container backlog" id="backlog">
                    <h3>Backlog</h3>
                    <backlog v-bind:backlog="backlog" @editButton="editButton" @backButton="backButton" :getCard="getCard" :edit_box="edit_box" @emitEditTask="editTask" @changeEditBox="changeEditBox"></backlog> 
                </div>
            </div>

            <div class="col-3 todo">
                <div class="mr-1 p-1 color-container todo" id="todo">
                    <h3>Todo</h3>
                    <todo v-bind:todo="todo" @editButton="editButton" @backButton="backButton" :getCard="getCard" :edit_box="edit_box" @emitEditTask="editTask" @changeEditBox="changeEditBox"></todo>
                </div>
            </div>

            <div class="col-3 done">
                <div class="mr-1 p-1 color-container done" id="done">
                    <h3>Done</h3>
                        <done v-bind:done="done" @editButton="editButton" @backButton="backButton" :getCard="getCard" :edit_box="edit_box" @emitEditTask="editTask" @changeEditBox="changeEditBox"></done>
                </div>                    
            </div>

            <div class="col-3 complete">
                <div class="mr-1 p-1 color-container complete" id="complete" >
                    <h3>Complete</h3>
                        <completed v-bind:completed="completed" @editButton="editButton" @backButton="backButton" :getCard="getCard" :edit_box="edit_box" @emitEditTask="editTask" @changeEditBox="changeEditBox"></completed>
                </div>
            </div>
        </div>
    </div>
    
    <addTask :kanban_box="kanban_box" :add_box="add_box" @addTask="addTask" @backButton="backButton"></addTask>
    


</div>
</template>

<script>
    import axios from 'axios'
    import Navbar from './components/navbar'
    import backlog from './components/backlog'
    import todo from './components/todo'
    import done from './components/done'
    import completed from './components/completed'
    import registerloginBox from './components/registerloginBox'
    import addTask from './components/addTask'
    
    export default {
            data(){
                return{
                card : [],
                getCard : [],
                whereUrl : 'http://localhost:3000',
                token : null,
                register_box : localStorage.token? false:true,
                kanban_box : localStorage.token? true:false,
                signOutToggle : localStorage.token? true:false,
                signUpToggle : localStorage.token? false:true,
                signInToggle : localStorage.token? false:true,
                login_box : false,
                add_box : false,
                edit_box : false,
                titleAdd : null,
                descriptionAdd : null,
                categoryAdd : null,
                titleEdit : null,
                descriptionEdit : null,
                categoryEdit: null  
                }
            },
            components:{
                Navbar,
                backlog,
                todo,
                done,
                completed,
                registerloginBox,
                addTask
            },
            methods: {

                addButton: function(){
                    this.kanban_box = false;
                    this.add_box = true;
                },

                editButton: function(data){
                    console.log(data)
                   //this.kanban_box = false;
                    this.getEachTask(data.id)
                    this.edit_box = true;
                },

                Back: function(){
                    this.kanban_box = true;
                    this.edit_box = false;
                    this.add_box = false;
                },

                backButton: function(){
                    this.edit_box = false;
                },

                loginButton: function(){
                    this.register_box = false;
                    this.login_box = true;
                },

                registerButton: function(){
                    this.login_box = false;
                    this.register_box = true;
                },

                registerToggle : function(){
                    this.login_box = false;
                    this.register_box = true;
                },

                loginToggle : function(){
                    this.register_box = false;
                    this.login_box = true;
                },

                login: function(data){
                    console.log(data)
                    axios({
                        method: 'POST',
                        url : `http://localhost:3000/user/login`,
                        data : {
                        email : data.email,
                        password : data.password
                        }
                    })
                    .then(data=>{
                        console.log('masuk')
                        localStorage.setItem('token',data.data.token)
                        this.token = data.data.token
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                },

                register: function(data){
                    axios({
                        method: "POST",
                        url : `${this.whereUrl}/user/register`,
                        data : {
                            name : data.name,
                            email : data.email,
                            password : data.password
                        }
                    })
                    .then(result=>{
                        this.login_box = true,
                        this.register_box = false
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                },

                getTask: function(){
                    axios({
                        method: "GET",
                        url : `${this.whereUrl}/task`,
                        headers : {token: localStorage.getItem('token')}
                    })
                    .then(result=>{
                        console.log(result.data)
                        this.card = result.data
                    
                    })
                },

                addTask: function(data){
                    axios({
                        method: "POST",
                        url : `${this.whereUrl}/task`,
                        headers : {token: localStorage.getItem('token')},
                        data : {
                            title : data.title,
                            description : data.description,
                            category : data.category
                        }
                    })
                    .then(result=>{
                        this.add_box = false;
                        this.getTask()
                        this.kanban_box = true;
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                },

                getEachTask: function(id){
                    axios({
                        method: "GET",
                        url : `${this.whereUrl}/task/${id}`,
                        headers : {token: localStorage.getItem('token')}
                    })
                    .then(result=>{
                        this.getCard = [result.data]
                       
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                },

                editTask: function(data){
                    console.log(data)
                    axios({
                        method: "PUT",
                        url : `${this.whereUrl}/task/${data.id}`,
                        headers : {token: localStorage.getItem('token')},
                        data : {
                            title : data.title,
                            description : data.description,
                            category : data.category
                        }
                    })
                    .then(result=>{
                        this.edit_box = false;
                        this.getTask()
                        
                    })
                    .catch(err=>{
                        console.log(err)
                    })

                },
                changeEditBox(){
                    this.edit_box = true;
                },
                logout: function(){
                    this.token = null,
                    this.login_box = false,
                    this.emailLogin = null,
                    this.passwordLogin = null,
                    this.nameRegister = null,
                    this.emailRegister= null,
                    this.passwordRegister = null
                }

            },
            computed:{
                backlog(){return this.card.filter((task) => task.category === "Backlog")},
                todo(){return this.card.filter((task) => task.category === "Todo")},
                done(){return this.card.filter((task) => task.category === "Done")},
                completed(){return this.card.filter((task) => task.category === "Completed")}
            },

            watch:{
                token : function(){
                    if(this.token !== null){
                        this.getTask()
                        this.kanban_box = true
                        this.register_box = false
                        this.kanban_box =  true
                        this.signOutToggle = true
                        this.signUpToggle = false
                        this.signInToggle = false
                        this.login_box = false
                        this.add_box = false
                        
                    } else{
                        this.kanban_box = false
                        this.register_box = true
                        this.kanban_box =  false
                        this.signOutToggle = false
                        this.signUpToggle = true
                        this.signInToggle = true
                    }
                }
            },

            created(){
                this.token= localStorage.getItem('token')
                console.log(this.token)
                    if(this.token){
                        this.getTask()
                    } else{
                       // console.log(error)
                    }
            }
                

        }

</script>