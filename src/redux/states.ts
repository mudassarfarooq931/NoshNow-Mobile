
export type BaseState<T> = {
  message: string;
  error: boolean;
  loading: boolean;
  body?: T;
};

export type RejectState = {
  rejectValue: {
    status: number;
    message: string;
    networkError: boolean;
  };
};
export type ToastState = {
  message?: string;
};
