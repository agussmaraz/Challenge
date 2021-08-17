<template>
    <div>
        <AddBox />
        <div id="visualization">
            <h3>
                <p>Agenda de Reservas</p>
            </h3>
            <div class="menu">
                <input style="display:none;" id="sliderZoom" type="range" class="range" name="a" min="-1" max="1" step="0.1" value="0" />
                <i class="material-icons dp48 buttons-menu" id="fit">home</i>
                <i class="material-icons dp48 buttons-menu" id="moveLeft">arrow_back</i>
                <i class="material-icons dp48 buttons-menu" id="moveRight">arrow_forward</i>
            </div>
        </div>
        <List />
    </div>
</template>

<script>
    import AddBox from './addBox.vue';
    import List from './list.vue';
    import vis from 'vis';
    import moment from 'moment';
    import { mapActions, mapState } from 'vuex';
    export default {
        components: {
            AddBox,
            List,
        },
        computed: {
            ...mapState({
                dateLine: (state) => state.horarios.dateLine,
            }),
        },
        methods: {
            ...mapActions({
                deleteData: 'horarios/deleteData',
            }),
            setData() {
                // create a timeline with some data

                var container = document.getElementById('visualization');
                if (container.querySelector('.vis-timeline')) {
                    container.removeChild(container.querySelector('.vis-timeline'));
                }
                const array = [];
                for (let index = 0; index < this.$store.state.horarios.dateLine.length; index++) {
                    const element = this.$store.state.horarios.dateLine[index];
                    array.push(element);
                }
                var items = new vis.DataSet(array);
                var options = {
                    //stack: false,
                    orientation: {
                        axis: 'top',
                        item: 'top',
                    },
                    //zoomMax: 31536000000, // just one year
                    zoomMax: 87600900, // 10,000 years is maximum possible
                    zoomMin: 10000000, // 10ms
                };
                var timeline = new vis.Timeline(container, items, options);

                /**
                 * Move the timeline a given percentage to left or right
                 * @param {Number} percentage   For example 0.1 (left) or -0.1 (right)
                 */
                function move(percentage) {
                    var range = timeline.getWindow();
                    var interval = range.end - range.start;
                    timeline.setWindow({
                        start: range.start.valueOf() - interval * percentage,
                        end: range.end.valueOf() - interval * percentage,
                    });
                }

                // attach events to the navigation buttons
                document.getElementById('moveLeft').onclick = function() {
                    move(0.2);
                };
                document.getElementById('moveRight').onclick = function() {
                    move(-0.2);
                };

                // Using slider to zoomIn or zoomOut
                document.getElementById('sliderZoom').addEventListener('input', function() {
                    var value = this.value;
                    if (value < 0) {
                        var start = moment().year(moment().year() - 100000), // to adjust with options
                            end = moment().year(moment().year() + 1);
                        timeline.zoomOut(-value);
                        if (value === '-1') timeline.setWindow(start, end);
                    } else if (value > 0) {
                        const start = moment();
                        const end = moment(moment().utc() + 10);
                        timeline.zoomIn(value);
                        if (value === '1') timeline.setWindow(start, end);
                    } else {
                        timeline.fit(items.getIds());
                        this.value = 0;
                    }
                });

                // To reset zoom initial state
                document.getElementById('fit').onclick = function() {
                    //$('.range').next().text('0'); // set default if to use output with input range
                    document.getElementById('sliderZoom').value = 0;
                    timeline.fit(items.getIds());
                };
            },
        },
        watch: {
            dateLine() {
                this.setData();
            },
        },
    };
</script>

<style scoped>
    h3 {
        display: flex;
        justify-content: flex-start;
        font-size: 22px;
        font-weight: normal;
        color: gray;
    }
</style>
