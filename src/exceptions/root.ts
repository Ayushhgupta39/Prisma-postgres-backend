
export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any) {
        super(message)
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCode { 
    USER_NOT_FOUND = 404,
    USER_ALREADY_EXISTS = 409,
    INCORRECT_PASSWORD = 403
}