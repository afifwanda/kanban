<template>
<div>
    <navbar ></navbar>

    <div class="container register" id="registerBox" v-if="register_box">
        <div class="row">
          <div class="col-6">
            <div class="signUpForm-left">
            </div>
          </div>
          <div class="col-6">
            <div  id = "signUpForm" class="signUpForm">
                <h4> Sign Up </h4>
                <form id="form-signUp" action="" method="POST">
                    <label for="fname">Name:</label><br>
                    <input type="text" id="name" name="name" value="" v-model="nameRegister"><br>
                    <label for="fname">Email:</label><br>
                    <input type="text" id="register-email" name="email" value="" v-model="emailRegister"><br>
                    <label for="lname">Password:</label><br>
                    <input type="password" id="register-password" name="password" value="" v-model="passwordRegister"><br><br>
                    <input type="submit" class="submit" id="button-signup-submit" value="Register" v-on:click.prevent="register">
                    <input type="submit" class="submit" id="button-backsignup-submit" value="Login" v-on:click="loginButton"> 
                </form> 
            </div>
          </div>
        </div>
      </div>


     <div class="container login" id="loginBox" v-if="login_box">
        <div class="row">
          <div class="col-6">
            <div class="signInForm-left">

            </div>
          </div>
          <div class="col-6">
            <div class = "signInForm" id ="signInForm">
                <form id="form-signIn" action="" method="POST">
                    <h4> Sign In </h4>
                    <label for="fname">Email:</label><br>
                    <input type="text" id="emailLogin" name="email" value="" required v-model="emailLogin"><br>
                    <label for="lname">Password:</label><br>
                    <input type="password" id="passwordLogin" name="password" value="" required v-model="passwordLogin"><br><br>
                    <input type="submit" class="submit" id="button-signin-submit" value="Submit" v-on:click.prevent="login">
                  </form> 
                  <br>
                  <input type="submit" class="submit" id="button-back-submit" value="Register" v-on:click="registerButton"> 
                  <br>
                  <div class="g-signin2" data-onsuccess="onSignIn"></div>
                  <br>
                </div>
          </div>
        </div>
      </div>

      <div class="container kanban" id="taskList" v-if="kanban_box">
        <br>
        <h4>Your Task List</h4>
        <br>
        <div class="addtask">
            <input type="button" class="submit" value="Add Task" id="input-add-task" v-on:click="addButton">
        </div>
        <div class="row" >

            <div class="col-3 backlog">
                <div class="mr-1 p-1 color-container backlog" id="backlog">

                    <h3>Backlog</h3>
                    <backlog v-bind:backlog="backlog"></backlog> 

                </div>
            </div>

            <div class="col-3 todo">
                <div class="mr-1 p-1 color-container todo" id="todo">
                    <h3>Todo</h3>
                    <div class="card" v-for="element in todo" :key="element.id">
                        <div class="card-body">
                          <p class="title">{{ element.title }}</p>
                          <p>{{ element.description }}</p>
                          <div class="linkcard">
                            <input type="button" class="submit card edit" value="Edit" v-on:click="addButton">
                            <input type="button" class="submit card delete" value="Delete" v-on:click="addButton">
                          </div>
                        </div>
                     </div>
                </div>
                
            </div>

            <div class="col-3 done">
                <div class="mr-1 p-1 color-container done" id="done">
                    <h3>Done</h3>
                    <div class="card" v-for="element in done" :key="element.id">
                        <div class="card-body">
                          <p class="title">{{ element.title }}</p>
                          <p>{{ element.description }}</p>
                          <div class="linkcard">
                            <input type="button" class="submit card edit" value="Edit" v-on:click="editButton(element.id)">
                            <input type="button" class="submit card delete" value="Delete" v-on:click="deleteTask(element.id)">
                          </div>
                        </div>
                     </div>
                </div>                    
            </div>

            <div class="col-3 complete">
                <div class="mr-1 p-1 color-container complete" id="complete" >
                    <h3>Complete</h3>
                    <div class="card" v-for="element in completed" :key="element.id">
                        <div class="card-body">
                          <p>{{ element.task }}</p>
                          <p>{{ element.description }}</p>
                          <div class="linkcard">
                            <input type="button" class="submit card edit" value="Edit" v-on:click="addButton">
                            <input type="button" class="submit card delete" value="Delete" v-on:click="addButton">
                          </div>
                        </div>
                     </div>
                </div>
            </div>


        </div>
    </div>

     <div class="container addTask" v-if="add_box">
        <div  id = "addTaskForm" class="addTaskForm">
            <h4> Add Task </h4>
            <form id="form-add" action="" method="POST">
                <label for="fname">Title:</label><br>
                <input type="text" id="title" name="title" value="" v-model="titleAdd"><br>
                <label for="fname">Description:</label><br>
                <input type="text" id="description" name="description" value="" v-model="descriptionAdd"><br>
                <label for="lname">Category:</label><br>
                <select id="Category" v-model="categoryAdd">
                    <option disabled selected>Select Category</option>
                    <option value="Backlog">Backlog</option>
                    <option value="Todo">Todo</option>
                    <option value="Done">Done</option>
                    <option value="Completed" selected>Completed</option>
                  </select><br><br>
                <input type="submit" class="submit" id="button-add-submit" value="Add Task" v-on:click.prevent="addTask">
                <input type="submit" class="submit" id="button-backadd-submit" value="Back" v-on:click="Back"> 
            </form> 
        </div>
    </div>


     <div class="container editTask" v-if="edit_box">
        <div  id = "editTaskForm" class="editTaskForm">
            <h4> Edit Task </h4>
            <form id="form-add" action="" method="POST" v-for="data in getCard" :key="data.id" >
                <label for="fname">Title:</label><br>
                <input type="text" id="title" name="title" value="" v-model="data.title"><br>
                <label for="fname">Description:</label><br>
                <input type="text" id="description" name="description" value="" v-model="data.description"><br>
                <label for="lname">Category:</label><br>
                <select id="Category" v-model="data.category">
                    <option disabled selected>Select Category</option>
                    <option value="Backlog">Backlog</option>
                    <option value="Todo">Todo</option>
                    <option value="Done">Done</option>
                    <option value="Completed" selected>Completed</option>
                  </select><br><br>
                <input type="submit" class="submit" id="button-edit-submit" value="Edit Task" v-on:click.prevent="editTask(data.id)">
                <input type="submit" class="submit" id="button-backedit-submit" value="Back" v-on:click="Back"> 
            </form> 
        </div>
    </div>

</div>
</template>

<script>
    import axios from 'axios'
    import navbar from './components/navbar'
    import backlog from './components/backlog'
    export default {
            data(){
                return{
                card : [],
                getCard : [],
                baseUrl : 'http://localhost:3000',
                token : localStorage.getItem('token'),
                register_box : localStorage.token? false:true,
                kanban_box : localStorage.token? true:false,
                signOutToggle : localStorage.token? true:false,
                signUpToggle : localStorage.token? false:true,
                signInToggle : localStorage.token? false:true,
                login_box : false,
                add_box : false,
                edit_box : false,
                emailLogin : null,
                passwordLogin : null,
                nameRegister : null,
                emailRegister: null,
                passwordRegister : null,
                titleAdd : null,
                descriptionAdd : null,
                categoryAdd : null,
                titleEdit : null,
                descriptionEdit : null,
                categoryEdit: null  
                }
            },
            components:{
                navbar,
                backlog
            },
            methods: {

                loginButton: function(){
                    this.register_box = false;
                    this.login_box = true;
                },

                registerButton: function(){
                    this.login_box = false;
                    this.register_box = true;
                },

                addButton: function(){
                    this.kanban_box = false;
                    this.add_box = true;
                },

                editButton: function(id){
                    this.kanban_box = false;
                    this.getEachTask(id)
                    this.edit_box = true;
                },

                Back: function(){
                    this.kanban_box = true;
                    this.edit_box = false;
                    this.add_box = false;
                },

                login: function(){
                    axios({
                        method: 'POST',
                        url : `${this.baseUrl}/user/login`,
                        data : {
                        email : this.emailLogin,
                        password : this.passwordLogin
                        }
                    })
                    .then(data=>{
                        console.log(data)
                        localStorage.setItem('token',data.data.token)
                        this.token = data.data.token
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                },

                register: function(){
                    axios({
                        method: "POST",
                        url : `${this.baseUrl}/user/register`,
                        data : {
                            name : this.nameRegister,
                            email : this.emailRegister,
                            password : this.passwordRegister
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
                        url : `${this.baseUrl}/task`,
                        headers : {token: localStorage.getItem('token')}
                    })
                    .then(result=>{
                        console.log(result.data)
                        this.card = result.data
                    
                    })
                },

                addTask: function(){
                    axios({
                        method: "POST",
                        url : `${this.baseUrl}/task`,
                        headers : {token: localStorage.getItem('token')},
                        data : {
                            title : this.titleAdd,
                            description : this.descriptionAdd,
                            category : this.categoryAdd
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
                        url : `${this.baseUrl}/task/${id}`,
                        headers : {token: localStorage.getItem('token')}
                    })
                    .then(result=>{
                        this.getCard = [result.data]
                        console.log(this.getCard)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                },

                editTask: function(id){
                    axios({
                        method: "PUT",
                        url : `${this.baseUrl}/task/${id}`,
                        headers : {token: localStorage.getItem('token')},
                        data : {
                            title : this.titleEdit,
                            description : this.descriptionEdit,
                            category : this.categoryEdit
                        }
                    })
                    .then(result=>{
                        this.edit_box = false;
                        this.getTask()
                        this.kanban_box = true;
                    })
                    .catch(err=>{
                        console.log(err)
                    })

                },

                

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
                    if(this.token){
                        this.getTask()
                    } else{
                        console.log(error)
                    }
            }
                

        }

</script>