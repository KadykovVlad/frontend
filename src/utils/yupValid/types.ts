export interface IYupValidator {
  status: boolean;
  errors: Record<string, string[]>;
}

export interface IYupProps {
  $loading: boolean;
  $validStatus: boolean;
  $errors: Record<string, string[]>;
  $formSubmited: boolean;
  $blured: Record<string, boolean>;
}

export type TStoreState<DATA> = IYupProps & DATA;

export type TStoreDefaultHelper<T> = {
  [x in keyof T]?: boolean
}

export type TStoreDefaultProps<T> = {
  [x in keyof T]: boolean
}

export enum EErrors {
  required = 'Это обязательное поле',
  emailInvalid = 'Не валидный email',
  emailRequired = 'Нужно указать email',
  sizeRange1t10 = 'Введите число в диапазоне от 1 до 10',
  password = 'Введите пароль от 6ти символов',
  dateInvalid = 'Дата введена некорректно',
}
