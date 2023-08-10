import { z } from "zod";

export const ThreadValidator = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});

export type ThreadData = z.infer<typeof ThreadValidator>;
