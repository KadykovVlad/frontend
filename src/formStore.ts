import { defineStore } from 'pinia';
import YupValidator from '@/utils/yupValid/YupValid';
import * as Yup from 'yup';
// utils
import { EYesNo, yesNoDtoHelper } from '@/utils/HelperYesNo';

// types 
import {
    TFormReqDto,
    postFromData,
    TJsonResponse,
    EDefaultMessages
} from './api';
import { TStoreState } from './utils/yupValid/types';

export enum LanguagesList {
  ru = 'ru',
  en = 'en',
  de = 'de',
  sp = 'sp',
}

// указываем типы данных в форме
export type TFormData = {
    languages?: LanguagesList; 
    gender?: string; 
    age?: string; 
    hobby?: string; 
    registration?: EYesNo; 
    haveJob?: EYesNo; 
    education?: string; 
    places?: string;
    overseas?: string; 
    haveHouse?: EYesNo; 
    name?: string; 
    surname?: string
    email?: string; 
    
    agreement?: string[];
}

// указываем схему валидации
const storeSchema = Yup.object().shape({});
// определяем её тип
type TSchema = typeof storeSchema;


// типы для описания шагов
export type TFormStoreState = TStoreState<TFormData>;

// описываем стор
export const useFormStore = defineStore('form-store', {

    // типизируем через helper, 
    // helper добавит служебные параметры
    state: (): TFormStoreState => {
        return {
            // IYupProps
            ...YupValidator.defaultProps<TFormData>({   
                // данные формы
                'languages': undefined,
                'gender': undefined,
                'age': undefined,
                'hobby': undefined,
                'registration': undefined,
                'haveJob': undefined,
                'education': undefined,
                'places': undefined,
                'overseas': undefined,
                'haveHouse': undefined,
                'name': undefined,
                'surname': undefined,
                'email': undefined,
                'agreement': undefined,
            }),
        }
    },

    actions: {
        // метод для отправки формы
        submit: function (e: Event) {
            e.preventDefault();

            if ( this.$loading ) { return }
            this.$loading = true;

            postFromData(this.dto)
                .then(res => {
                })
                .catch((res: TJsonResponse) => {
                    if (res.message === EDefaultMessages.functionality) {
                        // this.errorMessage = res.message;
                    }
                })
                .finally(() => {
                    this.$formSubmited = true;
                    this.$loading = false;
                })
        },
    },

    getters: {
        // отдаём только данные формы
        data(): TFormData {
            return {
                languages: this.languages,
                gender: this.gender,
                age: this.age,
                hobby: this.hobby,
                registration: this.registration,
                haveJob: this.haveJob,
                education: this.education,
                places: this.places,
                overseas: this.overseas,
                haveHouse: this.haveHouse,
                name: this.name,
                surname: this.surname,
                email: this.email,
                agreement: this.agreement,
            };
        },

        // приводим тип стора к контракту DTO
        dto(): TFormReqDto {

            const {
                // bools
                registration,
                haveJob,
                haveHouse,
                // не войдут в дто, обрабатываются отдельно
                agreement,
                // данные, которые идут в дто без меппинга
                ...data
            } = this.data;
            
            // bools
            const bools: Pick<TFormReqDto, 'registration' | 'haveJob' | 'haveHouse'> = {
                registration: yesNoDtoHelper(registration),
                haveJob: yesNoDtoHelper(haveJob),
                haveHouse: yesNoDtoHelper(haveHouse),
            };

            return {
                ...bools,
                ...data,
            }
        }
    },

});