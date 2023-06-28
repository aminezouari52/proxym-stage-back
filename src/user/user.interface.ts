export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  token?: string;
  bio?: string;
  image?: string;
}

export interface UserRO {
  user: UserData;
}
