<template>
    <div class="flex flex-col justify-between min-h-screen">
        <div class="flex-1">
            <SiteHead :title="$parent.$options.head?.title" />

            <Header
                :filters-visible="filtersVisible"
                :is-menu-visible="isMenuVisible"
                @open="isMenuVisible = true"
                @close="isMenuVisible = false"
            />

            <div class="flex">
                <div>
                    <SideNav
                        :is-menu-visible="isMenuVisible"
                        @close="isMenuVisible = false"
                    />
                </div>

                <main
                    class="px-4 py-8 w-full sm:px-8 md:pb-12 md:pl-32 md:pr-10"
                >
                    <slot></slot>
                </main>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import SiteHead from '@/Layouts/SiteHead';
import useFlashMessages from '@/Services/useFlashMessages';

import Header from '@/Components/Header';
import SideNav from '@/Components/SideNav';
import Footer from '@/Components/Footer';

import { useMediaQuery } from '@vueuse/core';
import { ref } from 'vue';

export default {
    name: 'AppLayout',

    components: {
        SiteHead,
        Header,
        SideNav,
        Footer,
    },

    provide() {
        const maxWidth400px = useMediaQuery('(max-width: 400px)');
        const maxWidth640px = useMediaQuery('(max-width: 640px)');

        return {
            maxWidth400px,
            maxWidth640px,
        };
    },

    props: {
        filtersVisible: {
            type: Boolean,
            default: false,
        },
    },

    setup() {
        const isMenuVisible = ref(false);

        return {
            ...useFlashMessages(),
            isMenuVisible,
        };
    },
};
</script>
