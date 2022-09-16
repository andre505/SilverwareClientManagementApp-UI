export interface UpdateClientRequest {
  name: string,
  description: string
  emailAddress: string,
  address: string,
  clientType: number,
  employeeUserId: number,
  id:number
}

export interface UpdateProfileImageRequest {
  Id: number,
  profileImage: any
}
