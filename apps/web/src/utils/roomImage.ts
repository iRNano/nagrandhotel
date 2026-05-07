const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800";

type RoomImageShape = { path?: string; contentType?: string };

/**
 * Resolves a room image to a display URL.
 * Handles both API shape { path, contentType } and full URL strings (e.g. from Cloudinary).
 */
export function getRoomImageUrl(
  image: RoomImageShape | string | null | undefined,
  baseUrl: string
): string {
  if (!image) return FALLBACK_IMAGE_URL;
  if (typeof image === "string") return image;
  if (image.path) return `${baseUrl}${image.path}`;
  return FALLBACK_IMAGE_URL;
}
