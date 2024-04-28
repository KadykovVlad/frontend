<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({ name: "input-group" });
</script>

<template>
    <div class="formular-input-group">
        <slot />
    </div>
</template>