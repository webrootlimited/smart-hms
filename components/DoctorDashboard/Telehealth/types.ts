export type PatientStatus = "Ready" | "Joining Soon" | "Waiting" | "In Call" | "Disconnected";

export interface WaitingPatient {
  id: string;
  name: string;
  avatar: string;
  type: string;
  waitingTime: string;
  waitingMins: number;
  status: PatientStatus;
  hasDocs: boolean;
  hasForm: boolean;
}
