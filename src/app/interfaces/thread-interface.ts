export interface Thread {
    id?: number;
    title: string;
    date: string;
    parentId: number | null;
    userId: number;
}