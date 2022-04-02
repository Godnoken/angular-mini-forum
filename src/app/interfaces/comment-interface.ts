export interface Comment {
    id?: number;
    threadId: number;
    parentId: number;
    userId: number;
    user: string;
    userTitle: string;
    date: string;
    content: string;
    isEditing: boolean;
}