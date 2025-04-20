export interface LoginRetornoErrorDto {
  error: ErrorDto;
}

interface ErrorDto {
  status: 400;
  message: string;
  timestamp: Date;
}
