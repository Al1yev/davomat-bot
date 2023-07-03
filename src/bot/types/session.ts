import { TCreateStudentAttendance } from "~/services/types";

export interface SessionData {
  user_id: number;
  login: string;
  password: string;
  token: string;
  token_valid_until: number;
  check_before_proceed: boolean;
  in_conversation: boolean;
  statistics_interval: "all" | "day" | "week" | "month";
  show_pass: boolean;
  group_id: number;
  students_attendance: TCreateStudentAttendance[];
}
