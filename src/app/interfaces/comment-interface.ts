export interface Comment {
    id?: number;
    threadId: number;
    parentId: number | null;
    userId: number;
    date: string;
    content: string;
}