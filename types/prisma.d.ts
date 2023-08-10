import { Thread, User, Comment, Community } from "@prisma/client";

export type CurrentUser = User & {
  communities: Community[];
};

export type CommentProps = Comment & {
  author: User;
};

export type ThreadProps = Thread & {
  author: User;
  comments: CommentProps[];
};

export type ResultProps = {
  threads: ThreadProps[];
  hasMorePages: boolean;
};
