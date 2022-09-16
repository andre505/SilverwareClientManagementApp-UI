export interface Client {
  id: number,
  name: string,
  description: string
  emailAddress: string,
  address: string,
  clientType: number,
  created: string,
  employeeUserId: number,
  profileImageUrl:string
}

export interface GetClientResponse {
  succeeded: boolean
  message: string
  errors: any
  data: Data
}

export interface Data {
  name: string
  description: string
  emailAddress: string
  address: string
  clientType: number
  posServices: any
  profileImageUrl: any
  applicationUserId: any
  assignedEmployee: any
  id: number
  createdBy: string
  created: string
  lastModifiedBy: any
  lastModified: any
}
