export interface Res {
  total: number
  total_pages: number
  results: Result[]
}

export interface Result {
  id: string
  created_at: string
  updated_at: string
  width: number
  height: number
  color: string
  description: string
  alt_description: string
  urls: Urls
  links: ResultLinks
  categories: any[]
  likes: number
  liked_by_user: boolean
  current_user_collections: any[]
  user: User
  tags: Tag[]
}

interface ResultLinks {
  self: string
  html: string
  download: string
  download_location: string
}

interface Tag {
  title: string
}

interface Urls {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
}

interface User {
  id: string
  updated_at: string
  username: string
  name: string
  first_name: string
  last_name: string
  twitter_username: null
  portfolio_url: string
  bio: string
  location: string
  links: UserLinks
  profile_image: ProfileImage
  instagram_username: string
  total_collections: number
  total_likes: number
  total_photos: number
  accepted_tos: boolean
}

interface UserLinks {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
  following: string
  followers: string
}

interface ProfileImage {
  small: string
  medium: string
  large: string
}
