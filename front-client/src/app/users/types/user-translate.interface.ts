export interface IUserWithTranslate {
  profile: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phone: string;
  succsessMessage: string,
  buttons: IButtonWithTranslation;
}

interface IButtonWithTranslation {
  edit: string;
  save: string;
  cancel: string;
}
