<template>
    <div class="row nav">
        <li id="button-signUp" v-if="signUpToggle" v-on:click="registerToggle" >Sign Up</li>
        <li id="button-signIn" v-if="signInToggle" v-on:click="loginToggle" >Sign In</li>
        <li id="button-signOut" v-if="signOutToggle" v-on:click="logout">Sign out</li>
    </div>

    
</template>
<script>

export default {
    data(){
        return{
                token : localStorage.getItem('token'),
                login_box : false,
                register_box : localStorage.token? false:true,
                kanban_box : localStorage.token? true:false,
                signOutToggle : localStorage.token? true:false,
                signUpToggle : localStorage.token? false:true,
                signInToggle : localStorage.token? false:true,
        }
    },
    methods: {
        registerToggle : function(){
            this.login_box = false;
            this.register_box = true;
        },

        loginToggle : function(){
            this.register_box = false;
            this.login_box = true;
        },

        logout: function(){
            localStorage.removeItem('token')
            this.token = null,
            this.login_box = false,
            this.emailLogin = null,
            this.passwordLogin = null,
            this.nameRegister = null,
            this.emailRegister= null,
            this.passwordRegister = null
        }
    }
}
</script>