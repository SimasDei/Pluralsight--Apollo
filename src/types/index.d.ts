export interface Session {
  id: number | string;
  title: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
  room?: string;
  day?: string;
  format?: string;
  track?: string;
  level?: string;
}
