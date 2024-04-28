<script setup lang="ts">
// import { ref } from "vue"
import Select from "@/components/kit/Select.vue";
import Label from "@/components/kit/Label.vue";
import customWrapper from "@/components/kit/customWrapper.vue";
import customInput from "@/components/kit/customInput.vue";
import GroupElement from "@/components/kit/groupElement.vue";
import Desctiption from "@/components/kit/Desctiption.vue";

import {languagesList} from "@/utils/lang";
import { useFormStore } from "./formStore";

const store = useFormStore();

</script>

<template>
  <customWrapper>
    <GroupElement>
      <Label>Вопрос первый</Label>
      <Desctiption>
        Не туристическое страхование, а постоянная медицинская страховка (gesetzlich или privat, туристические, incoming и т.д. не считаются).
      </Desctiption>
      <Select :options="languagesList"/>
    </GroupElement>

    <GroupElement>
      <Label>Второй вопрос</Label>
      <Desctiption>
        Не туристическое страхование, а постоянная медицинская страховка (gesetzlich или privat, туристические, incoming и т.д. не считаются).
      </Desctiption>
      <customInput placeholder="Введите"/>
    </GroupElement>
  </customWrapper>
</template>

<style lang="scss">
@import "./assets/css/master.scss";
</style>