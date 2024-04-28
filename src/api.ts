import { Api } from '@/api/Api';
export { TJsonResponse, EDefaultMessages } from '@/api/types';
import { TDtoBoolean } from '@/utils/HelperYesNo';


export type TFormReqDto = {
  languages?: string; 
  gender?: string; 
  age?: string; 
  hobby?: string; 
  registration?: TDtoBoolean; 
  haveJob?: TDtoBoolean; 
  education?: string; 
  places?: string;
  overseas?: string; 
  haveHouse?: TDtoBoolean; 
  name?: string; 
  surname?: string
  email?: string; 
}

export type TFormResDto = {
    status: boolean
}

export const postFromData = (data: TFormReqDto) => {
    const api = new Api();
    return api.postJson<TFormReqDto, TFormResDto>('/formular-api/form', data);
}