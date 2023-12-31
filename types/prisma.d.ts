import { Thread, User, Community } from "@prisma/client";

export type CommunityProps = Community & {
  members: User[];
};

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

export interface UserResultProps {
  users: User[];
  hasMorePages: boolean;
}

export interface communityResultProps {
  communities: CommunityProps[];
  hasMorePages: boolean;
}
