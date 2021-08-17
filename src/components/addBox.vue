<template>
    <section class="caja-padre">
        <h1 class="title">RESERVAR</h1>
        <article class="article-form">
            <div class="div-name">
                <p>Nombre</p>
                <input v-model="horarios.name" type="text" name="" id="" :class="error == true ? 'error' : null" />
            </div>
            <div>
                <p>Fecha</p>
                <input v-model="horarios.day" type="date" name="" id="" />
            </div>
            <div>
                <p>Desde</p>
                <input v-model="horarios.from" class="input-time" type="time" name="" id="" />
            </div>
            <div>
                <p>Hasta</p>
                <input v-model="horarios.to" class="input-time" type="time" name="" id="" />
            </div>
            <button class="button" @click="saveDate()">Guardar</button>
        </article>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                error: false,
                horarios: {
                    day: new Date().toISOString().slice(0, 10),
                    from: '12:00',
                    to: '13:00',
                    name: '',
                    id: 0,
                },
            };
        },
        mounted() {
            this.$store.dispatch('convert', this.$store.state.horarios.date);
        },
        methods: {
            saveDate() {
                if (this.horarios.name != '') {
                    this.$store.dispatch('addData', this.horarios);
                    this.$store.dispatch('convert', this.$store.state.horarios.date);

                    (this.horarios.day = new Date().toISOString().slice(0, 10)), (this.horarios.from = '12:00'), (this.horarios.to = '13:00'), (this.horarios.name = '');
                } else {
                    this.error = true;
                }
            },
        },
    };
</script>

<style scoped>
    .title {
        color: rgb(3, 102, 3);
        display: flex;
        justify-content: flex-start;
    }
    .caja-padre {
        width: 75%;
        margin: 0 auto;
        height: 200px;
        padding: 20px;
        border-radius: 8px;
        --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        align-items: center;
    }
    .article-form {
        display: flex;
        justify-content: space-around;
    }
    div {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
    }
    .div-name {
        width: 40%;
    }
    .error {
        border: solid red 1px;
    }
    input {
        width: 100%;
        height: 35px;
        border: solid rgb(194, 192, 192) 1px;
        border-radius: 3px;
        color: gray;
        font-size: 15px;
        outline: none;
        padding-left: 5px;
        text-transform: capitalize;
    }
    .input-time {
        width: 90px;
    }
    .button {
        --tw-border-opacity: 1;
        border: rgba(16, 185, 129, var(--tw-border-opacity));
        --tw-border-opacity: 1;
        background: rgba(16, 185, 129, var(--tw-border-opacity));
        color: white;
        width: 120px;
        height: 38px;
        border-radius: 3px;
        font-size: 15px;
        font-weight: bold;
        margin-top: 42px;
    }
</style>
