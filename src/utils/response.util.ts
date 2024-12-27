import { ResponseDTO, ResponseDTOwithObject } from "../dtos/response.dto";

export function createErrorResponse(
  message: string,
  code: number,
): ResponseDTO {
  return {
    status: code,
    Data: "",
    success: false,
    message,
  };
}

export function createSuccessResponse(
  Data: string,
  message: string,
  code: number,
): ResponseDTO {
  return {
    status: code,
    Data: Data,
    success: true,
    message,
  };
}

export function createSuccessResponseWithData(
  Data: object | null,
  message: string,
  code: number,
): ResponseDTOwithObject {
  return {
    status: code,
    Data: Data || {},
    success: true,
    message,
  };
}
