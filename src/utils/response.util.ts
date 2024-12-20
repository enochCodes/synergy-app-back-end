import { ResponseDTO } from '../dto/response.dto';


export function createErrorResponse(message: string, code: number): ResponseDTO {
    return {
        status: code,
        Data: '',
        success: false,
        message,
    };
}

export function createSuccessResponse(Data: string, message: string, code: number): ResponseDTO {
    return {
        status: code,
        Data: Data,
        success: true,
        message,
    };
}