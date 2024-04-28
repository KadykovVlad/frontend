<script setup lang="ts">
import { defineComponent, defineProps, ref, defineEmits, toRef } from 'vue';
import { getUniqId } from '@/utils';
import { IInput } from '@/components/kit/types';
import { getValueFromEvent } from './helpers';


// props
const props = defineProps<IInput>();

const type = props.type || 'text';
const idi = props.id || getUniqId();
const value = ref(props.modelValue || '');
let prevValue = value.value; // для предыдущего значения инпута
const isValid = props.validator || (()=>{return true});
const elementRef = ref(null); // для получения ref к input
const name = toRef(props, 'name');
const onValid = props.onValid || null;
const onInvalid = props.onInvalid || null;
const onBlur = props.onBlur || null;

defineComponent({ name: 'kit-input' });

// emits
const emits = defineEmits(['update:modelValue']);

// methods
const isTextarea = (type: string) => type === 'textarea';

const inputHandler = (e: Event) => {
    const eventValue = getValueFromEvent(e);

    if (isValid(eventValue)) {
        onValid && onValid();
        prevValue = eventValue;
        value.value = eventValue;
        emits('update:modelValue', value);
    }
    else {
        onInvalid && onInvalid(eventValue);
        // возвращаем предыдущее значение
        value.value = prevValue;
    }
}
</script>

<template>
    <input 
        v-if="!isTextarea(type)" 
        ref="elementRef"
        class="formular-input"
        :id="idi"
        :type="type"
        :name="name"
        :placeholder="placeholder || ''"
        :required="Boolean(required)" 
        :disabled="Boolean(disabled)" 
        
        v-model="value" 
        @input="inputHandler"
        @blur="onBlur"
    />
    <textarea
        v-if="isTextarea(type)"
        ref="elementRef"
        class="formular-input"
        :id="idi"
        :name="name"
        :placeholder="placeholder || ''"
        :required="Boolean(required)"
        :disabled="Boolean(disabled)"

        v-model="value" 
        @input="inputHandler"
        @blur="onBlur"
    />
</template>