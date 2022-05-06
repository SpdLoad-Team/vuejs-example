<template>
    <div class="mt-6 rounded-lg shadow-md overflow-hidden">
        <div class="flex justify-between pt-4 px-6 w-full">
            <div class="flex items-center">
                <RadioButton
                    v-model="typeChart"
                    :types="types"
                    :label="switchChartText"
                    label-classes="!mb-0 mr-6 text-gray-500 font-medium capitalize"
                    @update:model-value="handleTypeChart"
                />
            </div>

            <div class="flex items-center">
                <Label :value="__('new')" />
                <Switch
                    v-model="switchChart"
                    class="mx-2.5"
                    @update:model-value="handleSwitchChart"
                />
                <Label :value="__('total')" />
            </div>
        </div>

        <div class="px-6">
            <VueApexCharts
                type="area"
                height="350"
                :options="chartOptions"
                :series="series"
            />
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

import VueApexCharts from 'vue3-apexcharts';
import RadioButton from '@/Components/Form/Inputs/RadioButton';
import Switch from '@/Components/Form/Inputs/Switch';
import Label from '@/Components/Form/Inputs/Label';

export default {
    name: 'LineChartComponent',

    components: {
        VueApexCharts,
        RadioButton,
        Switch,
        Label,
    },

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    setup(props) {
        const typeChart = ref('projects');
        const switchChart = ref(false);
        const switchChartText = ref('new');
        const types = ['projects', 'students', 'customers'];

        const series = ref([
            {
                name: 'series1',
                data: props.data[`${typeChart.value}.${switchChartText.value}`],
            },
        ]);
        const chartOptions = computed(() => ({
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                categories: props.data.labels,
            },
        }));

        const handleSwitchChart = (value) => {
            switchChartText.value = value ? 'total' : 'new';
            series.value[0].data =
                props.data[`${typeChart.value}.${switchChartText.value}`];
        };

        const handleTypeChart = () => {
            series.value[0].data =
                props.data[`${typeChart.value}.${switchChartText.value}`];
        };

        return {
            switchChart,
            switchChartText,
            types,
            series,
            chartOptions,
            typeChart,
            handleSwitchChart,
            handleTypeChart,
        };
    },
};
</script>
