import { z } from "zod";

export const CommentValidator = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});

export type CommentData = z.infer<typeof CommentValidator>;
