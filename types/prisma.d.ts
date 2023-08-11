import { Thread, User, Community } from "@prisma/client";

export type CurrentUser = User & {
  communities: Community[];
};

export type ThreadProps = Thread & {
  author: User;
  community: Community | null;
};

export type ResultProps = {
  threads: ThreadProps[];
  hasMorePages: boolean;
};
