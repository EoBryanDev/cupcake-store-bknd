interface IPostgresError {
  code: string;
  message: string;
  detail?: string;
  table?: string;
  constraint?: string;
  column?: string;
  severity?: string;
}

export type { IPostgresError };
