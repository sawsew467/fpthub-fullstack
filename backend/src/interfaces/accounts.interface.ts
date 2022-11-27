export interface Account {
  accountID: number;
  studentName: string;
  email: string;
  password: string;
  follow: number;
  role: number;
  avatar: string;
}

export interface RequestAccount {
  email: string;
  password: string;
}
