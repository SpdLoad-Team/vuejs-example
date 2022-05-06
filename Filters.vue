<template>
    <ul class="w-[19rem] flex-1 overflow-auto space-y-5">
        <li v-for="(filters, categories) in filterCategories" :key="categories">
            <button
                v-if="Object.keys(filterCategories).length > 1"
                class="mb-3 px-8 w-full"
                type="button"
                @click="expanded[categories] = !expanded[categories]"
            >
                <div
                    class="
                        flex
                        items-center
                        pb-1.5
                        text-blue-600 text-sm
                        border-b border-gray-100
                        uppercase
                    "
                >
                    <Component
                        :is="filterIcons[categories]"
                        class="fill-[url(#grad)] w-6"
                    />

                    <span class="ml-2 leading-6">
                        {{ categories }}
                    </span>

                    <IconChevron
                        class="
                            ml-auto
                            w-2.5
                            text-gray-300
                            transform
                            duration-150
                        "
                        :class="{
                            'scale-[-1]': expanded[categories],
                        }"
                    />
                </div>
            </button>

            <Transition
                enter-active-class="transition-all duration-150"
                enter-from-class="max-h-0 overflow-hidden"
                enter-to-class="max-h-screen overflow-hidden"
                leave-active-class="transition-all duration-150"
                leave-from-class="max-h-screen"
                leave-to-class="max-h-0 overflow-hidden"
            >
                <ul
                    v-show="expanded[categories]"
                    class="px-3 space-y-2.5 sm:px-8"
                >
                    <li v-for="(filter, name) in filters" :key="name">
                        <Slider
                            v-if="filter.isSlider"
                            v-model="filter.selected"
                            :step="filter.config.step"
                            :min="filter.config.min"
                            :max="filter.config.max"
                            :label="__(filter.label)"
                        />
                        <DatePickerRange
                            v-else-if="filter.isCalendar"
                            v-model="filter.searchPeriod"
                            classes="filter-calendar"
                            readonly
                        />
                        <InputTags
                            v-else-if="
                                name !== 'regions' || filter.options.length
                            "
                            v-model="filter.selected"
                            tag-classes="truncate max-w-[121px] inline-block"
                            :options="filter.options"
                            object
                            option-label="name"
                            track-by="name"
                            :label="__(filter.label)"
                            @remove="remove"
                        />
                    </li>
                </ul>
            </Transition>
        </li>
    </ul>
</template>

<script>
import { reactive } from 'vue';

import Slider from '@/Components/Form/Inputs/Slider';
import InputTags from '@/Components/Form/Inputs/InputTags';
import DatePickerRange from '@/Components/Form/Inputs/DatePickerRange';

import IconStudents from '@/Components/Icons/IconStudents';
import IconProjects from '@/Components/Icons/IconProjects';
import IconCustomers from '@/Components/Icons/IconCustomers';
import IconChevron from '@/Components/Icons/IconChevron';

export default {
    name: 'Filters',

    components: {
        IconStudents,
        IconProjects,
        IconCustomers,
        IconChevron,
        Slider,
        InputTags,
        DatePickerRange,
    },

    props: {
        filterCategories: {
            type: Object,
            required: true,
        },
    },

    emits: ['remove'],

    setup(props, { emit }) {
        const expanded = reactive({
            students: true,
            projects: true,
            customers: true,
            search: true,
        });

        const filterIcons = {
            students: IconStudents,
            projects: IconProjects,
            customers: IconCustomers,
        };

        const remove = (filter) => emit('remove', filter);

        return {
            expanded,
            filterIcons,
            remove,
        };
    },
};
</script>
