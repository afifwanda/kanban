<template>
    <div>
        <div class="card" v-for="element in backlog" v-bind:key="element.id">
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
</template>

<script>
import axios from 'axios'
export default {
    props: ['backlog'],
    data(){
        return{
          baseUrl : 'http://localhost:3000',
          token : localStorage.getItem('token'),  
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
                            url : `${this.baseUrl}/task/${id}`,
                            headers : {token: localStorage.getItem('token')}
                        })
                        .then(result=>{
                            this.getTask()
                            this.kanban_box = true;
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                    
                    });
                } else {
                    swal("Your imaginary file is safe!");
                    this.getTask()
                    this.kanban_box = true;
                }
                console.log("deleted")
            });
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
        }
    }
}
</script>