export interface LocalizedMessage
{
  locale: string;
  message: string;
}

export interface CustomMessage 
{
  level: string;
  code: string;
  messages: LocalizedMessage[];
}