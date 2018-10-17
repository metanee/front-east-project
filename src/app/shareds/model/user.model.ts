export class User{

  public id:number ;
	public username: string;
	public password: string;
	public firstName: string;
	public lastName: string;
	public gender: string;
	public birthDay: string;
	public nationality: string;
	public address: string;
	public religion: string;
	public education: string;
	public institute: string;
	public faculty: string;
	public branch: string;
	public startyearEducation: string;
	public endyearEducation: string;
	public gpaEducation: string;
	public startmonthJobexp: string;
	public startyearhJobexp: string;
	public endyearJobexp: string;
	public endmonthJobexp: string;
	public companyNameJobexp: string;
	public careerJobexp: string;
	public salaryJobexp: string;
	public descriptionJobexp: string;
  public email: string;
  public partImage: string;
  public idcard: string;
	public phone: string;
}

export enum IRoleAccount {
  Member = 1,
  Owner,
  Admin
}

export class IUser{
  user: User[];
  totalItems: number;

}
export class UserSearch {
  searchText?: string;
  searchType?: string;

  startPage: number;
  limitPage: number;
}

export class UserSearchKey {
  key: string;
  value: string;
}
