import { HTTPStatusCode } from "./data-types";

export class HttpException extends Error {
    constructor(
        public readonly statusCode: HTTPStatusCode,
        public readonly description: string = ""
    ) {
        super(description);
    }

    public toObject() {
        return {
            statusCode: this.statusCode,
            description: this.description,
        };
    }
}