import { User } from "./user.model";
import { Company } from "./company.model";

export class Employee{
  employeeId: number
  firstNameEmployee: string
  lastNameEmployee: string
  genderEmployee: string
  userId: number
  companyId: number
  jobposition: string
  sarary: string
  invice: boolean
  inviceDate: Date;
  startJobDate: Date;
  endJobDate: Date;
  user: User;
  company: Company;

}
