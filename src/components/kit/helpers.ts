import { reactive, ref, Ref } from "vue";

export const getValueFromEvent = (e: Event) => {
   return (e.target as HTMLInputElement).value;
}

export const getCheckedFromEvent = (e: Event) => {
   return (e.target as HTMLInputElement).checked;
}

export const useInputErrorHandler = (cb?: (isValid: boolean, errorText: Ref<string>, str?: string) => void) => {

   const isError = ref<boolean>(false);
   const errorText = ref<string>('');

   const onInvalid = (str: string) => {
      isError.value = true;
      cb && cb(false, errorText, str);
   }

   const onValid = () => {
      isError.value = false;
      errorText.value = '';
      cb && cb(true, errorText);
   }

   const onBlur = () => onValid();

   return reactive({
      isError,
      onValid,
      onInvalid,
      onBlur,
      errorText,
   });
}

export const useFileStorage = () => {

   const fileList = ref<File[]>([]);
   const updateFileListHandler = (list: File[]) => {
      fileList.value = [...fileList.value, ...list];
   };

   return {
      fileList,
      updateFileListHandler
   }
}

export const preventDefaults = (e: Event) => {
   e.preventDefault();
   e.stopPropagation();
}