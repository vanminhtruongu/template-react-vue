<!-- eslint-disable prettier/prettier -->
<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AppMenuItem from './AppMenuItem.vue';

const { t } = useI18n();

const model = computed(() => [
    // Add your menu items here
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model">
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :key="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator" :key="'sep-' + i"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
