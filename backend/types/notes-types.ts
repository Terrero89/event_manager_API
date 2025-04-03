export type PriorityLevelType = 'low' | 'medium' | 'high';

export interface Toddos {
    relatedStoryId: string;
    title: string;
    description: string;
    date: Date;
    dueDate: Date;
    priorityLevel: PriorityLevelType;
    status: string
}