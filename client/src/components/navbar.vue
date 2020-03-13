<template>
    <div class="row nav">
        <li id="button-signUp" v-if="signUpToggle" v-on:click.prevent="registerToggle()" >Sign Up</li>
        <li id="button-signIn" v-if="signInToggle" v-on:click.prevent="loginToggle()" >Sign In</li>
        <li id="button-signOut" v-if="signOutToggle" v-on:click.prevent="logout()">Sign out</li>
    </div>

    
</template>
<script>

export default {
    props:['signUpToggle','signInToggle','signOutToggle','token'],
    data(){
        return{
                login_box : false,
                register_box : localStorage.token? false:true,
                kanban_box : localStorage.token? true:false,
        }
    },
    methods: {
        registerToggle : function(){
            this.$emit("registerToggle")
        },

        loginToggle : function(){
            this.$emit("loginToggle")
        },

        logout: function(){
            let token = localStorage.removeItem('token')
            this.$emit("logoutToggle", token)
        }
    }
}
</script>