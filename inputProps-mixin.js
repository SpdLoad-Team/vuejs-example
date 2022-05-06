export default {
    props: {
        modelValue: {
            type: [String, Number, Boolean, Array, Date, File, Object],
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        helperText: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'text',
        },
        message: {
            type: String,
            default: '',
        },
        min: {
            type: Number,
            required: false,
        },
        max: {
            type: Number,
            required: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        accept: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        autocomplete: {
            type: String,
            default: '',
        },
    },
};
