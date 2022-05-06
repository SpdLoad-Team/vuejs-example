<template>
    <AppLayout :filters-visible="filtersVisible">
        <div>
            <div class="flex items-center justify-between mb-3">
                <Heading level="2">
                    {{ __('dashboard.title') }}
                </Heading>

                <div class="flex items-center">
                    <Tabs
                        :tabs="tabs"
                        classes="bg-gray-100 text-gray-800 hover:bg-blue-50 py-2.5"
                    />

                    <div class="flex items-center justify-center ml-6">
                        <DatePicker
                            v-model="customPeriod"
                            :masks="{ weekdays: 'WWW', input: 'DD.MM.YYYY' }"
                            range
                            input-classes="bg-gray-100 w-60"
                            @update:model-value="handleCustomPeriod"
                        />
                    </div>

                    <div class="flex items-center ml-4">
                        <Button
                            class="w-10 h-10 shadow-md"
                            variant="round"
                            type="button"
                            @click="toggleFilters"
                        >
                            <IconFilters class="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <Filters
                class="mt-6"
                :show="filtersVisible"
                :meta="meta"
                @close="toggleFilters"
            />

            <Stats :data="stats" />

            <LineChartComponent :data="chart" />

            <div class="flex mt-6">
                <div class="w-2/6">
                    <PopularLabels
                        :data="popular_labels"
                        :in-progress="in_progress_labels"
                        :period="!!period ? period : 'today'"
                    />
                </div>

                <div class="ml-6 w-2/6">
                    <ClosedInactiveProjectsTable
                        :closed-projects-head="closedProjectsHead"
                        :closed-project-body="closed_projects"
                        :user-uuid="user.uuid"
                        :header="__('dashboard.closed-projects')"
                        :period="!!period ? period : 'today'"
                    />
                </div>
                <div class="ml-6 w-2/6">
                    <ClosedInactiveProjectsTable
                        :closed-projects-head="closedProjectsHead"
                        :closed-project-body="inactive_projects"
                        :user-uuid="user.uuid"
                        :header="__('dashboard.inactive-projects')"
                        :period="!!period ? period : 'today'"
                    />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import { ref, inject, computed } from 'vue';
import { Inertia } from '@inertiajs/inertia';

import AppLayout from '@/Layouts/AppLayout';

import Heading from '@/Components/Heading';
import Tabs from '@/Components/Tabs';
import Filters from '@/Components/Filters/Index';
import Button from '@/Components/Form/Inputs/Button';
import DatePicker from '@/Components/Form/Inputs/DatePicker';
import Stats from '@/Components/Dashboard/Stats';
import LineChartComponent from '@/Components/Dashboard/LineChartComponent';
import PopularLabels from '@/Components/Dashboard/PopularLabels';
import ClosedInactiveProjectsTable from '@/Components/Dashboard/ClosedInactiveProjectsTable';

import IconFilters from '@/Components/Icons/IconFilters';

export default {
    components: {
        AppLayout,
        Heading,
        Tabs,
        DatePicker,
        Filters,
        Button,
        IconFilters,
        Stats,
        LineChartComponent,
        PopularLabels,
        ClosedInactiveProjectsTable,
    },

    props: {
        students: {
            type: Object,
            required: true,
        },

        customers: {
            type: Object,
            required: true,
        },

        projects: {
            type: Object,
            required: true,
        },

        revenue: {
            type: Object,
            required: true,
        },

        // eslint-disable-next-line
        popular_labels: {
            type: Array,
            required: true,
        },

        // eslint-disable-next-line
        in_progress_labels: {
            type: Number,
            required: true,
        },

        // eslint-disable-next-line
        closed_projects: {
            type: Array,
            required: true,
        },
        inactive_projects: {
            type: Array,
            required: true,
        },

        chart: {
            type: Object,
            required: true,
        },

        period: {
            type: String,
            required: true,
        },

        user: {
            type: Object,
            required: true,
        },

        meta: {
            type: Object,
            required: true,
        },
    },

    setup(props) {
        const __ = inject('__');
        const customPeriod = ref({
            start: {},
            end: {},
        });

        const closedProjectsHead = computed(() => [
            {
                slot: 'project',
                title: __('projects'),
            },
            {
                slot: 'budget',
                title: __('budget'),
            },
        ]);

        const tabs = computed(() => [
            {
                name: __('dashboard.today'),
                route: 'super-admins.dashboard',
                routeQueryKey: 'period',
                routeQueryValue: 'today',
            },
            {
                name: __('dashboard.week'),
                route: 'super-admins.dashboard',
                routeQueryKey: 'period',
                routeQueryValue: 'week',
            },
            {
                name: __('dashboard.month'),
                route: 'super-admins.dashboard',
                routeQueryKey: 'period',
                routeQueryValue: 'month',
            },
            {
                name: __('dashboard.year'),
                route: 'super-admins.dashboard',
                routeQueryKey: 'period',
                routeQueryValue: 'year',
            },
        ]);
        const tabActive = ref('today');

        const filtersVisible = ref(false);
        const toggleFilters = () =>
            (filtersVisible.value = !filtersVisible.value);

        const stats = computed(() => [
            {
                name: 'students',
                label: __('students'),
                ...props.students,
            },
            {
                name: 'customers',
                label: __('customers'),
                ...props.customers,
            },
            {
                name: 'projects',
                label: __('projects'),
                ...props.projects,
            },
            {
                name: 'revenue',
                label: __('revenue'),
                ...props.revenue,
            },
        ]);

        const handleCustomPeriod = (value) => {
            Inertia.visit(
                route('super-admins.dashboard', {
                    period: null,
                    from: value.start.toISOString().split('T')[0],
                    to: value.end.toISOString().split('T')[0],
                })
            );
        };

        return {
            customPeriod,
            tabActive,
            stats,
            tabs,
            filtersVisible,
            toggleFilters,
            closedProjectsHead,
            handleCustomPeriod,
        };
    },
};
</script>
