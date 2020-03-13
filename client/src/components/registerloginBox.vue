<template>
    <div>
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
                        <input type="submit" class="submit" id="button-signup-submit" value="Register" v-on:click.prevent="register()">
                        <input type="submit" class="submit" id="button-backsignup-submit" value="Login" v-on:click.prevent="loginButton()"> 
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
                        <input type="submit" class="submit" id="button-signin-submit" value="Submit" v-on:click.prevent="login()">
                    </form> 
                    <br>
                    <input type="submit" class="submit" id="button-back-submit" value="Register" v-on:click="registerButton()"> 
                    <br>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    <br>
                    </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>

export default { 
    props:['register_box','login_box'],
    data(){
        return{
            nameRegister : null,
            emailRegister: null,
            passwordRegister : null,
            emailLogin: null,
            passwordLogin : null
        }
    },
    methods: {
        register(){
            let data = {
            name : this.nameRegister,
            email : this.emailRegister,
            password : this.passwordRegister
            }
            this.$emit('register',data) 
        },

        login(){
            let data = {
            email : this.emailLogin,
            password : this.passwordLogin
            }
            this.$emit('login',data) 
        },

        loginButton: function(){
            this.$emit("loginButton")
        },

        registerButton: function(){
           this.$emit("registerButton")
        }
    }


     
}
</script>