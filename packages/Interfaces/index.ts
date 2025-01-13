export interface UserInterface {
  id: string
  email: string
  firstName: string
  password: string // This should be hashed in production
}
export interface ProductInterface {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}
