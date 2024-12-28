export type ArrayObjType =  Array<Object>
export type StoryType = 'story' | 'bug' | 'non-prod' | 'tasks' | 'tech_debt' | 'spike' | 'POC'
export type DevType = 'FE' | 'BE' | 'FS' | 'AWS'
export type StatusType = 'to do' | 'in progress' | 'demo_ready | completed' | 'released'
export type DifficultyLevelType = 'easy' | 'medium' | 'hard'



// interface for story data type

export interface Story {
    storyTitle: string,
    storyDescription: ArrayObjType,
    acceptanceCriteria: ArrayObjType,
    difficultyLevel: DifficultyLevelType,
    storyPoints: number,
    workType: string,
    developmentType: DevType,  // FE | BE | FS | AWS
    status: string,
    storyComments: ArrayObjType,
    subtasks: ArrayObjType, 
    date: Date,
    reporter: string,
    repoNames: string[],
    dateAssigned: Date,
    dateCompleted: Date,
    sprint: string,
    storyType: string, 
    learning: ArrayObjType,
    planningNotes: string[],

}