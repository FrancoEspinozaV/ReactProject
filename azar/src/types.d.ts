export interface SquareType {
  id: string
  placeholder: number
  background: string
  weights: number
  userData: UserDataType
}

export interface UserDataType {
  phone: string
  name: string
  email: string
}
