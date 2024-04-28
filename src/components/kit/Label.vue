<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({ name: "input-label" });
</script>

<template>
    <label class="formular-question-label">
        <slot />
    </label>
</template>