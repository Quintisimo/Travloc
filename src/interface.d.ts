export interface Res {
  photos: Photos
  stat: string
}

export interface Params {
  lat: number
  lon: number
  page: number
}

export interface Photos {
  page: number
  pages: number
  perpage: number
  total: string
  photo: Photo[]
}

export interface Photo {
  id: string
  owner: string
  secret: string
  server: string
  farm: number
  title: string
  ispublic: number
  isfriend: number
  isfamily: number
  latitude: string
  longitude: string
  accuracy: string
  context: number
  place_id?: string
  woeid?: string
  geo_is_family: number
  geo_is_friend: number
  geo_is_contact: number
  geo_is_public: number
  url_l?: string
  height_l?: string
  width_l?: string
}
