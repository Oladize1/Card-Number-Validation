export interface cardValidationResult {
    isValid: boolean
    message: string
}

export interface cardValidationRequestBody {
    cardNumber: string
}

export interface cardValidationResponseBody {
    status: "success"
    statusCode: number
    isValid: boolean
    message: string
}