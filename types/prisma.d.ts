import { Thread, User, Community } from "@prisma/client";

export type CurrentUser = User & {
  communities: Community[];
};

export type ThreadProps = Thread & {
  author: User;
};

export type ResultProps = {
  threads: ThreadProps[];
  hasMorePages: boolean;
};
