import {
  TJsonResponse,
  EDefaultMessages
} from './types';


const headers = {
  'x-site': 'form'
}


export class Api {

  private postJSONRequest<RequestDTO>(endpoint: string, data: RequestDTO) {
      return fetch(endpoint, {
          method: 'POST',
          headers: {
              ...headers,
              'content-type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(data),
      });
  }

  postJson<RequestDTO, ResponseDTO>(endpoint: string, data: RequestDTO): Promise<ResponseDTO> {
      // eslint-disable-next-line
      return new Promise<ResponseDTO>(async (res, rej: (response: TJsonResponse)=>void) => {
          // отправляем запрос
          let response;

          try {
              response = await this.postJSONRequest<RequestDTO>(endpoint, data);
          }
          catch (e) {
              // если запрос отвалился без ответа от сервера
              return rej({ code: 500, message: EDefaultMessages.functionality });
          }

          // парсим ответ
          let responseData: Record<string, any> = { code: 500, message: 'invalid-data' };
          let validData = false;

          try {
              responseData = await response.json();
              validData = true;
          }
          catch (e) {
              e;
          }

          if (response?.status === 200 && validData) {
              // возвращаем данные ответа
              res(responseData as ResponseDTO);
          }
          else {
              // возвращаем ошибки
              rej({
                  code: response?.status || 400,
                  message: validData && responseData?.message ? responseData.message : 'invalid-data',
              });
          }

      });
  }

  private postRequest(endpoint: string, data: FormData) {
      return fetch(endpoint, {
          method: 'POST',
          headers,
          body: data,
      });
  }

  postFormData<ResponseDTO>(endpoint: string, data: FormData): Promise<ResponseDTO> {
      // eslint-disable-next-line
      return new Promise<ResponseDTO>(async (res, rej: (response: TJsonResponse)=>void) => {
          // отправляем запрос
          let response;

          try {
              response = await this.postRequest(endpoint, data);
          }
          catch (e) {
              // если запрос отвалился без ответа от сервера
              return rej({ code: 500, message: EDefaultMessages.functionality });
          }

          // парсим ответ
          let responseData: Record<string, any> = { code: 500, message: 'invalid-data' };
          let validData = false;

          try {
              responseData = await response.json();
              validData = true;
          }
          catch (e) {
              e;
          }

          if (response?.status === 200 && validData) {
              // возвращаем данные ответа
              res(responseData as ResponseDTO);
          }
          else {
              // возвращаем ошибки
              rej({
                  code: response?.status || 400,
                  message: validData && responseData?.message ? responseData.message : 'invalid-data',
              });
          }

      });
  }

}