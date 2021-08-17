export default {
    state: () => ({
        date: [
            {
                day: new Date().toISOString().slice(0, 10),
                from: '12:00',
                to: '13:00',
                name: 'Agustina Maraz',
                id: '0',
            },
        ],
        dateLine: [],
    }),
    getters: {},
    actions: {
        addData({ commit }, payload) {
            commit('ADD_DATA', payload);
        },
        deleteData({ commit, state }, name) {
            const array = state.date.filter((array) => array.name !== name);
            commit('DELETE_DATA', array);
        },
        convert({ commit }, payload) {
            commit('CONVERT_DATA', payload);
        },
    },
    mutations: {
        ADD_DATA(state, payload) {
            state.date.push({ ...payload });
        },
        DELETE_DATA(state, array) {
            state.date = array;
        },
        CONVERT_DATA(state, payload) {
            // console.log(payload);
            var obj = {};
            for (let index = 0; index < payload.length; index++) {
                const element = payload[index];

                obj = {
                    id: state.dateLine[state.dateLine.length - 1] ? state.dateLine[state.dateLine.length - 1].id + 1 : 1,
                    content: element.name,
                    start: element.day + ' ' + element.from,
                    end: element.day + ' ' + element.to,
                };
            }
            state.dateLine.push(obj);
        },
    },
};
