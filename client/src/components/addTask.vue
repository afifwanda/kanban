<template>
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
                <input type="submit" class="submit" id="button-add-submit" value="Add Task" v-on:click.prevent="addTask()">
                <input type="submit" class="submit" id="button-backadd-submit" value="Back" v-on:click="backButton()"> 
            </form> 
        </div>
    </div>
</template>

<script>
export default {
    props : ['add_box','kanban_box'],
    data(){
        return{
            titleAdd : null,
            descriptionAdd : null,
            categoryAdd : null
        }
    },
    methods : {
        addTask(){
            let data = {
                title : this.titleAdd,
                description : this.descriptionAdd,
                category : this.categoryAdd
            }
            this.$emit('addTask',data)
        },

        backButton(){
            this.$emit("backButton")
        }
    },
}
</script>