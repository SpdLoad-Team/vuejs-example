<template>
    <InputWrapper
        :label="label"
        :required="required"
        :helper-text="helperText"
        :message="message"
    >
        <DatePicker
            v-model="editedValue"
            :is-required="required"
            :is-range="range"
            :min-date="minDate"
            :max-date="maxDate"
            :masks="masks"
            :mode="mode"
            :is24hr="is24hr"
            :popover="{ placement: popoverPlacement, visibility: 'click' }"
            @update="$emit('update:modelValue', $event.target.value)"
        >
            <template #default="{ inputValue, inputEvents }">
                <div
                    class="relative flex bg-gradient-to-t rounded-md"
                    :class="{
                        'focus-within:from-indigo-500 focus-within:to-cyan-500':
                            !message,
                    }"
                >
                    <input
                        ref="input"
                        :placeholder="placeholder"
                        :disabled="disabled"
                        :readonly="readonly"
                        :class="[
                            inputClasses,
                            message
                                ? 'border-red-500 focus:border-red-500'
                                : 'focus:border-transparent',
                        ]"
                        :value="
                            range
                                ? `${inputValue.start} - ${inputValue.end}`
                                : inputValue
                        "
                        class="
                            placeholder-gray-300
                            peer
                            px-3.5
                            py-2
                            w-full
                            text-gray-500
                            bg-white bg-clip-padding
                            border border-gray-100
                            rounded-md
                            focus:outline-none
                            shadow-sm
                            focus:ring-0
                        "
                        autocomplete="autocomplete"
                        v-on="range ? inputEvents.start : inputEvents"
                    />
                    <IconCalendar
                        class="
                            peer-focus:fill-[url(#calendar-grad)]
                            absolute
                            right-4
                            top-2.5
                            w-5
                            h-5
                            text-gray-300
                        "
                        :class="{ 'text-red-50': message }"
                    />
                </div>
                <Gradient id="calendar-grad" class="absolute -left-full" />
            </template>
        </DatePicker>
    </InputWrapper>
</template>

<script>
import { DatePicker } from 'v-calendar';
import { computed } from 'vue';

import InputWrapper from '@/Components/Form/Inputs/InputWrapper';

import IconCalendar from '@/Components/Icons/IconCalendar';
import Gradient from '@/Components/Icons/Gradient';

import inputProps from '@/mixins/inputProps';

export default {
    components: {
        DatePicker,
        InputWrapper,
        IconCalendar,
        Gradient,
    },

    mixins: [inputProps],

    props: {
        range: {
            type: Boolean,
            default: false,
        },

        masks: {
            type: [String, Object],
            default: () => ({
                weekdays: 'WWW',
                input: 'DD MMMM YYYY',
                inputDateTime24hr: 'DD MMMM YYYY HH:mm',
            }),
        },

        mode: {
            type: String,
            default: 'date',
        },

        is24hr: {
            type: Boolean,
            default: false,
        },

        minDate: {
            type: [String, Number, Date],
            default: null,
        },

        maxDate: {
            type: [String, Number, Date],
            default: null,
        },

        popoverPlacement: {
            type: String,
            default: 'bottom-start',
        },

        inputClasses: {
            type: String,
            default: '',
        },
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const editedValue = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        return {
            editedValue,
        };
    },
};
</script>
