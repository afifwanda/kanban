<template>

    <div>
        <div class="card" v-for="element in backlog" v-bind:key="element.id">
            <div class="card-body">
                <p class="title">{{ element.title }}</p>
                <p>{{ element.description }}</p>
                <div class="linkcard">
                    <input type="button" class="submit card edit" value="Edit" v-on:click.prevent="editButton(element.id)">
                    <input type="button" class="submit card delete" value="Delete" v-on:click.prevent="deleteTask(element.id)">
                </div>
            </div>
        </div>
            
        <editTask :kanban_box="kanban_box" @backButton="backButton" :getCard="card" @emitEditTask="emitEditTask" v-if="edit_box" ></editTask>
    </div>

</template>

<script>
import axios from 'axios'
import editTask from './editTask'
export default {
        components:{
        editTask
    },
    props: ['backlog','edit_box', 'getCard', 'kanban_box'],
    data(){
        return{
          whereUrl : 'http://localhost:3000',
          token : localStorage.getItem('token'),  
          id : this.backlog.id,
          card:[],
        } 
    },

    methods: {

        deleteTask: function(id){
            swal({
                title: "Are you sure want to delete this?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    axios({
                            method: "DELETE",
                            url : `${this.whereUrl}/task/${id}`,
                            headers : {token: localStorage.getItem('token')}
                        })
                        .then(result=>{
                            this.getTask()
                            this.kanban_box = true;
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    swal("file has been deleted!", {
                    icon: "success",
                    
                    });
                } else {
                    swal("Your file is safe!");
                    this.getTask()
                    this.kanban_box = true;
                }
                console.log("deleted")
            });
        },
         
        getOneTask: function(data){
            axios({
                method: "GET",
                url : `${this.whereUrl}/task/${data.id}`,
                headers : {token: localStorage.getItem('token')}
            })
            .then(result=>{
                this.card = [result.data]
                this.$emit("changeEditBox")
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

        editButton: function(id){
            let data = {
                id : id
            }
            this.getOneTask(data)
        },

        backButton()
        {
            this.$emit("backButton")},

        emitEditTask(data){
            this.$emit("emitEditTask", data)
        }

        
    }


}
</script>