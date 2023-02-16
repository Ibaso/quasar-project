<template>
    <div style="" class="absolute-center ">
        <q-card style="width: 300px; text-align: center">
            <q-card-section>

                <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                >
                    <q-input
                            v-if="isSignUp"
                            outlined
                            v-model="screen_name"
                            label="Full Name"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                    <q-input
                            outlined
                            v-model="login"
                            label="Username"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />

                    <q-input
                            outlined
                            type="password"
                            v-model="password"
                            label="Password"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                    <q-input
                            v-if="isSignUp"
                            outlined
                            type="Confirm Password"
                            v-model="passwordConfirm"
                            label="Parolni tasdiqlang"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 && val === this.password || 'Parollar mos emas']"
                    />
                  <label class="text-grey" v-if="!isSignUp" >if you already have account sign in</label>

                    <div>
                        <q-btn label="Submit" type="submit" color="primary"/>
                    </div>
                </q-form>

            </q-card-section>
          <q-separator/>
          <div class="q-pt-sm text-grey" v-if="!isSignUp">or</div>
            <q-card-section align="center">

                <q-btn :label="isSignUp?'Sign in':'Sign up'" color="green" @click="signUp"/>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
    import {apiUrls} from "src/utils/const/apiUrls";
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        name: "LoginPageComponent",
        props: {},
        data() {
            return {
                login: "",
                password: "",
                passwordConfirm: "",
                isSignUp: false,
                screen_name: ""

            }
        },
        methods: {
            ...mapGetters(['getUser']),
            ...mapMutations(['setUser']),
            onSubmit() {
                if (!this.isSignUp) {
                    this.$axios.post(apiUrls.auth + '/login', {
                        login: this.login,
                        password: this.password
                    }).then(res => {

                        this.$router.push({path: '/home'})

                        this.setUser(res.data)

                    }).catch(err => {
                        console.log(err)
                        alert(err.errorMessage)
                    })
                } else {

                    this.$axios.post(apiUrls.user + '/signup', {
                        username: this.login,
                        password: this.password,
                        screen_name: this.screen_name
                    }).then(res => {

                        this.$axios.post(apiUrls.auth + '/login', {
                            login: this.login,
                            password: this.password
                        }).then(res => {

                            this.$router.push({path: '/home'})

                            this.setUser(res.data)

                        }).catch(err => {
                            console.log(err)
                            alert(err.errorMessage)
                        })

                    }).catch(err => {
                        console.log(err)
                        alert(err.errorMessage)
                    })


                }
            },
            signUp() {
                this.isSignUp = !this.isSignUp
            }
        }
    }
</script>

<style scoped>

</style>
