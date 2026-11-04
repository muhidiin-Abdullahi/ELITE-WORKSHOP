export type ApiFieldError = {
  path: string;
  message: string;
};

export type ApiErrorBody = {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: ApiFieldError[];
  };
};

export type ApiSuccessBody<T = null> = {
  success: true;
  data: T;
};

export type ApiResponse<T = null> = ApiSuccessBody<T> | ApiErrorBody;

export function isApiErrorBody(body: unknown): body is ApiErrorBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "success" in body &&
    body.success === false
  );
}
