<template>
<Login msg="Welcome to Your Vue.js App" />
</template>

<script>
import Login from './components/LoginPage'

export default {
    name: 'App',
    components: {
        Login
    },
    methods: {},
    created() {
        this.service.intercept();
    }
}
</script>
