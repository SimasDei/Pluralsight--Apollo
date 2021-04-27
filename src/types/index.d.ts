export interface Session {
  id: number;
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
