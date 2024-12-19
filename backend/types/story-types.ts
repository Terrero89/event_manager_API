
// type that defines array of objects
export type ArrayObjType =  Array<Object>
export type StoryType = 'story' | 'bug' | 'non-prod' | 'tasks' | 'tech_debt'
export type DevType = 'FE' | 'BE' | 'FS' | 'AWS'
export type StatusType = 'to do' | 'in progress' | 'demo_ready | completed' | 'released'
export type DifficultyLevelType = 'easy' | 'medium' | 'hard'
export type WorkType = 'story' | 'bug' | 'non-prod'


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
    planningNotes: ArrayObjType,

}

// interface for user data type
/**
 * subtasks
 * learning
 * planningNotes
 * acceptanceCriteria
 * storyDescription
 * storyComments
 * 
 */



// other interface/types
//arrayObject --> type for array of objects
/*
difficultyLevel: 3 options
workType: 3 options (story, bug, non-prod, tasks, tech_debt)
developmentType: 3 options (FE, BE, FS)
status: 5 options (to do, in progress,demo_ready completed, released)
difficultyLevel: 3 options (easy, medium, hard)
developmentType: 4 options (FE, BE, FS, AWS)



*/