<script>
import {ref} from 'vue'
import axios from 'axios'

export default {
  name: 'LoginView',
  setup() {
    const email = ref('')
    const password = ref('')

    const login = async () => {
      const response = await axios.post('http://localhost:9000/api/auth', JSON.stringify({
        email: email.value,
        password: password.value
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if (response.data.success) {
        //window.location.href = '/admin'
      }
    }

    return {
      email,
      password,
      login
    }
  }
}


</script>

<template>
<main class="main">
    <div class="login">
        <h1>Login</h1>

        <form @submit.prevent="login">
            <label for="email">
                <!-- font awesome icon -->
                <i class="fas fa-user"></i>
            </label>
            <input type="email" v-model="email" placeholder="Email" id="email" required>

            <label for="password">
                <i class="fas fa-lock"></i>
            </label>
            <input type="password" v-model="password" placeholder="Password" id="password" required>
            <input type="submit" value="Login">
        </form>
    </div>
</main>
</template>

<style scoped>
.login {
    width: 400px;
    background-color: #ffffff;
    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.3);
    margin: 100px auto;
}
.login h1 {
    text-align: center;
    color: #5b6574;
    font-size: 24px;
    padding: 20px 0 20px 0;
    border-bottom: 1px solid #dee0e4;
}
.login form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 20px;
}
.login form label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #3274d6;
    color: #ffffff;
}
.login form input[type="password"], .login form input[type="email"] {
    width: 310px;
    height: 50px;
    border: 1px solid #dee0e4;
    margin-bottom: 20px;
    padding: 0 15px;
}
.login form input[type="submit"] {
    width: 100%;
    padding: 15px;
   margin-top: 20px;
    background-color: #3274d6;
    border: 0;
    cursor: pointer;
    font-weight: bold;
    color: #ffffff;
    transition: background-color 0.2s;
}
.login form input[type="submit"]:hover {
  background-color: #2868c7;
    transition: background-color 0.2s;
}
</style>