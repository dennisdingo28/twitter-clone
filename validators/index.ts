import * as z from "zod";
import { ZodError } from "zod";

export const SignUpValidator = z.object({
    username: z.string().min(2,"The username must be at least 2 characters long !"),
    email: z.string().email("You must provide a valid email address!"),
    password: z.string().min(4,"The password must be at least 4 characters long !"),
});

export type SignUpRequest = z.infer<typeof SignUpValidator>;


export const SignInValidator = z.object({
    identifier: z.string().min(2,"Must be at least 2 characters long !"),
    password: z.string().min(4,"The password must be at least 4 charcters long !"),
});

export type SignInRequest = z.infer<typeof SignInValidator>;



export const TweetValidator = z.object({

    tweetDescription: z.optional(z.string()),
    uploadUrl: z.optional(z.string()),
    userId: z.string(),
    communityId: z.optional(z.string()),

  }).refine((data) => {
    if (!data.tweetDescription && !data.uploadUrl) {
        throw new ZodError([
          {
            code:"custom",
            message: "Either tweetDescription or uploadUrl must be provided.",
            path: ["tweetDescription"],
          },
        ]);
      }
    return true;
  });
  
export type TweetRequest = z.infer<typeof TweetValidator>;



export const CommentValidator = z.object({
  tweetId: z.string(),
  userId: z.string(),
  comment: z.string(),
  uploadUrl: z.optional(z.string()),
});

export type CommentRequest = z.infer<typeof CommentValidator>;



export const FollowValidator = z.object({
  sessionUserId: z.string(),
  userId: z.string(),
});

export type FollowRequest = z.infer<typeof FollowValidator>;



export const BookmarkValidator = z.object({
  tweetId: z.string(),
  userId: z.string(),
});

export type BookmarkRequest = z.infer<typeof BookmarkValidator>;



export const CommunityValidator = z.object({
  communityName: z.string(),
  communityImage: z.optional(z.string()),
});

export type CommunityRequest = z.infer<typeof CommunityValidator>;