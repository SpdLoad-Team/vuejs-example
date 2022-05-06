<script>
import { h } from 'vue';

export default {
    name: 'Heading',
    props: {
        level: {
            type: [Number, String],
            required: true,
        },
    },

    render() {
        return h(
            'h' + this.level,
            {
                class: {
                    'text-4xl text-gray-500 leading-10 font-extrabold tracking-light':
                        +this.level === 1,
                    'text-2xl text-gray-500 leading-9 font-semibold':
                        +this.level === 2,
                    'text-xl text-gray-500': +this.level === 3,
                    'text-base leading-4 md:text-lg md:leading-5 text-gray-900 font-medium':
                        +this.level === 4,
                    'text-base leading-6 text-blue-gray-700 font-medium':
                        +this.level === 5,
                },
            },
            this.$slots.default()
        );
    },
};
</script>
