export interface Comment {
    id?: number;
    threadId: number;
    parentId: number;
    user: string;
    date: string;
    content: string;
    isEditing: boolean;
}