import { z } from "zod";

export const imageSchema = z.object({
  Key: z.string(),
  LastModified: z.date(),
  Size: z.number(),
});

export const listImagesSchema = z.array(imageSchema);

export type ImageType = z.infer<typeof imageSchema>;
