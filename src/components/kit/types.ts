export type TInput = 'text' | 'email' | 'password' | 'tel' | 'number' | 'search' | 'url' | 'textarea';

export type TValidator = (data: string) => boolean;

export interface ILabel {
    id?: string
}

export interface IRefKit {
    $refs: {
        elementRef: HTMLInputElement | null;
    }
}

export interface IInput {
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    type?: TInput;
    validator?: TValidator;
    onValid?: () => void;
    onInvalid?: (value: string) => void;
    onBlur?: () => void;
}

export interface IRadio {
    modelValue?: string,
    disabled?: boolean,
    required?: boolean,
    value: string,
    name: string,
}

export interface ICheckbox {
    modelValue?: string[],
    disabled?: boolean,
    required?: boolean,
    value: string,
    name?: string,
}

export interface IDatepicker {
    modelValue?: Date | null,
    placeholder?: string,
    disabled?: boolean,
    required?: boolean,
    id?: string,
    date?: string,
    minDate?: Date,
    maxDate?: Date,
    format?: (date: Date)=>string
}

export type TSelectOption = {
    value: string;
    label: string;
};

export interface ISelect {
    modelValue?: string | string[];
    options: TSelectOption[];
    id?: string;
    multiple?: boolean;
    noSearch?: boolean;
    disabled?: boolean;
}

export type TAnchorTarget = '_top' | '_blank' | '_self' | '_parent';
export interface IAnchor {
    href: string;
    target?: TAnchorTarget;
}

export interface IReadmore {
    title: string;
    open?: boolean;
}

export interface IInputFile {
    id?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    multiple?: boolean;
    accept?: EInputFileAccept;
}

export enum EInputFileAccept {
    imagesVsPdf = 'image/jpeg, image/png, image/gif, image/webm',
    imagesVsPdfVsDoc = 'image/jpeg, image/png, image/gif, image/webm, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword',
}