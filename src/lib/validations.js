import { z } from 'zod';

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const installationUploadSchema = z.object({
  file: z.any()
    .refine((file) => file instanceof File, "Un fichier est requis.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `L'image ne doit pas dépasser 5 Mo.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Seuls les formats .jpg, .jpeg, .png et .webp sont acceptés."
    ),
  description: z.string().max(100, "La description ne doit pas dépasser 100 caractères.").optional(),
});
