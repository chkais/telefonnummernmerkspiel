import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    "short_name": "Telefonnummern Merk Spiel",
    "name": "Telefonnummern Merk Spiel",
    "icons": [
      {
        "src": "icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "icon-512x512.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ],
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
}