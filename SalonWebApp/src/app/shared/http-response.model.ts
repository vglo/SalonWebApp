export interface HttpResponseBasic {
    responseCode: string;
    responseMessage: string;
    response: any;
  }
  
  export interface HttpResponseTemplate<T> {
    responseCode: string;
    responseMessage: string;
    response: T;
  }
  