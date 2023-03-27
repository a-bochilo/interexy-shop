export interface ISignUpTemplateDetails {
  firstname: string;
  middlename?: string;
  lastname: string;
}

export interface ISignUpTemplate {
  email: string;
  password: string;
  phone?: string;
  details: ISignUpTemplateDetails;
}
