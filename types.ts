export interface UserJwtPayload {
    username: string;
    email: string;
    imageUrl: string;
}
export interface Comment {
    userId: string;
    comment: string;
}