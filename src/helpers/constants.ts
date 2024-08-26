//TYPES

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export interface ThemeType {
    name: String,
    views: Number
}
export class HttpException {
    constructor(public code: number, public message: string = httpStatusCode(code)) {}
}
function httpStatusCode(code: number): string {
    throw new Error("Function not implemented.");
}

