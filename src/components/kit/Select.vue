<script setup lang="ts">
import {computed, defineProps, ref, onMounted, onBeforeUnmount} from "vue";

const dropDown = ref(null)
const selectedOption = ref(null)

const props = defineProps({
    options: {
        type: Array,
        required: true
    }
})

const mappedSelectedOption = computed(() => {
    return (selectedOption.value?.label || selectedOption.value) || 'Выберите язык'
})

const toggleOptionSelect = (option:any) => {
    selectedOption.value = option;
    isDropDownVisible.value = false;
} 

const isDropDownVisible = ref(false);

const closeDropDown = (element:any) => {
    if(!dropDown.value.contains(element.target))
    isDropDownVisible.value = false;
}

onMounted(() => {
    window.addEventListener('click', closeDropDown)
})

onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropDown)
})
</script>

<template>
    <div class="dropdown-wrapper" ref="dropDown">
        <div class="dropdown-selected-option" @click="isDropDownVisible = true">
            {{ mappedSelectedOption }}
        </div>
        <transition name="slide-fade">
        <div 
            class="options-wrapper"
            v-if="isDropDownVisible"
            >
            <div 
            class="option"
            v-for="(option, index) in props.options"
            :key="index"
            @click="toggleOptionSelect(option)"
            >
                {{ option.label || option }}
            </div>
        </div>
        </transition>
    </div>
</template>

<style>
.dropdown-wrapper{
    padding: 16px;
    cursor: pointer;
    max-width: auto;
    margin: 0 auto;
}

.dropdown-selected-option{
    padding: 16px;
    border: solid 1px #313131;
    border-radius: 8px;
    box-sizing: border-box;
    margin-bottom: 4px;
}

.option:hover {
    background: #c5c5c5;
}

.option{
    padding: 16px;
    border: none;
    box-sizing: border-box;
}

.slide-fade-enter-active{
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active{
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-4px);
    opacity: 0;
}
</style>