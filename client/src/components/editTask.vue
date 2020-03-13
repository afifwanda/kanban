<template>
        <div class="container editTask">
        <div  id = "editTaskForm" class="editTaskForm">
            <h6> Edit Status </h6>
            <form id="form-add" action="" method="POST" >
                <label for="fname">Title:</label><br>
                <input type="text" id="title" name="title" value="" v-model="title"><br>
                <label for="fname">Description:</label><br>
                <input type="text" id="description" name="description" value="" v-model="description"><br>
                <label for="lname">Category:</label><br>
                <select id="Category" v-model="category">
                    <option disabled selected>Select Category</option>
                    <option value="Backlog">Backlog</option>
                    <option value="Todo">Todo</option>
                    <option value="Done">Done</option>
                    <option value="Completed" selected>Completed</option>
                  </select><br><br>
                <input type="submit" class="submit" id="button-edit-submit" value="Edit Task" v-on:click.prevent="editTask(id)">
                <input type="submit" class="submit" id="button-backedit-submit" value="Cancel" v-on:click.prevent="backButton()"> 
            </form> 
        </div>
    </div>
</template>
<script>
export default {
    props : ['edit_box','kanban_box', 'getCard'],
    data(){
        return{
            id : '',
            title : '',
            description : '',
            category : ''
        }
    },
    created(){
        this.getCard.forEach(element => {
            this.id = element.id,
            this.title = element.title,
            this.description = element.description,
            this.category = element.category
        });
        
    },
    
    methods:{
        editTask(id){
            let data = {
                id : id,
                title : this.title,
                description : this.description,
                category : this.category
            }
            this.$emit('emitEditTask',data)
        },

        backButton(){
            this.$emit("backButton")
        }
    }
}
</script>