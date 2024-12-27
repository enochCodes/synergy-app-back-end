export interface ResponseDTO {
  status: number;
  Data: string;
  success: boolean;
  message: string;
}

export interface ResponseDTOwithObject {
  status: number;
  Data: object;
  success: boolean;
  message: string;
}
