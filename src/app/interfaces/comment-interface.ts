export interface Comment {
    id?: number;
    threadId: number;
    parentId: number;
    userId: number;
    date: string;
    content: string;
    isEditing: boolean;
}