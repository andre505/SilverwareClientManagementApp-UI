export interface Client {
  id: number,
  name: string,
  description: string,
  clientType: number,
  emailAddress: string,
  address: string,
  created: string,
  employeeUserId: number,
  profileImageUrl:string
}

export interface ClientResponse {
  pageNumber: number
  pageSize: number
  succeeded: boolean
  message: any
  errors: any
  data: Client[]
}
