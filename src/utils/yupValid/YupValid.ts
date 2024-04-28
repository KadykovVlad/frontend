import { IYupValidator, IYupProps, TStoreDefaultHelper, TStoreDefaultProps } from './types';


export default class YupValidator {

    static async validator<SCHEMA extends { validate: (data: DATA, props: any) => Promise<any> }, DATA>
        (schema: SCHEMA, data: DATA): Promise<IYupValidator> {

        let errors;

        try {
            await schema.validate(data, { abortEarly: false });
        }
        catch (e: any) {
            errors = e.inner;
        }

        let status = true;
        const errorsMap: Record<string, string[]> = {};

        if (Array.isArray(errors) && errors.length) {
            // есть ошибки, обрабатываем
            status = false;

            errors.forEach(err => {
                errorsMap[err.path] = errorsMap[err.path] ? [...errorsMap[err.path], ...err.errors] : err.errors;
            });
        }

        return {
            status,
            errors: errorsMap
        }
    }

    static async validateInput<SCHEMA extends { validate: (data: any, props: any) => Promise<any> }, DATA>
        (store: IYupProps & DATA, schema: SCHEMA, prop: keyof DATA): Promise<void> {

        const key = prop.toString();

        const data = {
            [key]: store[prop]
        };

        // получаем результат валидации
        const {
            status,
            errors
        } = await YupValidator.validator<SCHEMA, typeof data>(schema, data);

        // устанавливаем значения
        store.$validStatus = store.$validStatus && status;
        store.$errors = {
            ...store.$errors,
            [key]: errors[key]
        };
    }

    static defaultProps<DATA>(data: DATA): IYupProps & DATA {

        const blured: TStoreDefaultHelper<DATA> = {};

        for (const key in data) {
            blured[key] = false;
        }

        return {
            $loading: false,
            $validStatus: false,
            $errors: {},
            $formSubmited: false,
            $blured: blured as TStoreDefaultProps<DATA>,
            ...data
        }
    }

    static setAllBlured<DATA>(data: DATA): TStoreDefaultProps<DATA> {
        const blured: TStoreDefaultHelper<DATA> = {};

        for (const key in data) {
            blured[key] = true;
        }

        return blured as TStoreDefaultProps<DATA>;
    }

}