export interface FormData {
  startTime: string;
  endTime: string;
  name: string;
}

export interface Event extends FormData {
  id: number;
}
