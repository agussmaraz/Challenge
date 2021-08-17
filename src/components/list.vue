<template>
    <section class="caja-padre">
        <article class="header">
            <div class="div-name">Nombre</div>
            <div class="div-time1">
                Horario
                <!-- <div @click="orderArray"> -->
                <!-- <IconArrow class="arrow" /> -->
                <!-- </div> -->
            </div>
            <div class="div-time">Acción</div>
        </article>
        <section v-if="showData.length > 0">
            <article class="caja-data" v-for="(item, index) in showData" :key="index">
                <div class="div-name_data">{{ item.name }}</div>
                <div class="div-time_data">de {{ item.from }} a {{ item.to }}</div>
                <div class="div-time_data" @click="deleteDate(item.name)"><IconTrash class="trash" /></div>
            </article>
        </section>
        <section v-else>
            <p class="p-vacio">
                No hay horarios cargados aún.
            </p>
        </section>
    </section>
</template>

<script>
    // import IconArrow from '@/components/icons/arrow.vue';
    import IconTrash from '@/components/icons/trash.vue';
    export default {
        components: {
            IconTrash,
            // IconArrow,
        },
        computed: {
            showData() {
                return this.$store.state.horarios.date;
            },
        },
        methods: {
            deleteDate(name) {
                this.$store.dispatch('deleteData', name);
            },
        },
    };
</script>

<style scoped>
    .caja-padre {
        width: 75%;
        margin: 60px auto;
    }
    .header {
        display: flex;
        justify-content: space-between;
    }
    .caja-data {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        border-top: solid rgb(214, 213, 213) 1px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .div-name {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        margin-top: 5px;
        font-weight: 600;
        color: gray;
    }
    .div-time {
        font-weight: 600;
        color: gray;
    }
    .div-time1 {
        font-weight: 600;
        color: gray;
        display: flex;
        align-items: center;
    }
    .arrow {
        width: 15px;
        margin-left: 4px;
    }
    .div-name_data {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        margin-top: 5px;
        font-weight: bold;
        text-transform: capitalize;
    }
    .div-time_data {
        margin-top: 5px;
        font-weight: 600;
        color: gray;
    }
    .p-vacio {
        border-top: solid rgb(214, 213, 213) 1px;
        padding-top: 10px;
    }
    .trash {
        width: 20px;
        height: 20px;
    }
</style>
