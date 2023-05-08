// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: number
  role: string
  email: string
  status: string
  avatar: string
  company: string
  country: string
  contact: string
  fullName: string
  username: string
  current_plan: string
  avatarColor?: ThemeColor
}

export type CategoryType = {
  id: string
  category_name: string
  abbreavation: string
  description: string
  status: string
  image : string
}

export type SubCategoryType = {
  id: string
  sub_catname: string
  abbreavation: string
  description: string
  status: string
  image : string
}
export type ProductType = {
  id: string
  name: string
  category: string
  sub_category: string
  specification: string
  description: string
  image: string
  status: string
}


export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
