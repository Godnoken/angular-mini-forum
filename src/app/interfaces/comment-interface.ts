export interface Comment {
    id?: number;
    threadId: number;
    parentId: number | null;
    userId: number;
    date: string;
    content: string;
    isFirstComment: boolean;
    quotedUserId?: number;
    quotedCommentContent?: string;
    quotedCommentDate?: string;
}