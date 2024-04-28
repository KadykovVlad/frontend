<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({ name: "label-description.vue" });
</script>

<template>
    <span class="formular-question-label-desc">
        <slot />
    </span>
</template>