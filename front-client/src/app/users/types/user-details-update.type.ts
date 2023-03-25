export interface UserUpdateDto {
  id: string;
  email: string;
  phone: string;
  details: {
    firstname: string;
    lastname: string;
    middlename: string;
  };

  details_id: string;
}
