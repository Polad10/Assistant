interface BaseAlbum {
  title: string
  treatment_id: number
}

interface Album extends BaseAlbum {
  id: number
}

interface AlbumRequest extends BaseAlbum {
  id?: number | null | undefined
}

export { Album, AlbumRequest }
