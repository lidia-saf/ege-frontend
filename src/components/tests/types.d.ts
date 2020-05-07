export interface IQuestion {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: ISource;
}

export interface ISource {
    questionNumber: number;
    questionDescription: string;
    mediaKey?: string;
    testId: number;
    section: TSection;
    task: string;
    text: string;
    possibleAnswers: string;
    correctAnswer: string;
    time?: number;
}

export interface ITestDescription {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: ITestDescriptionSource;
}

export interface ITestDescriptionSource {
    testId: number;
    name: string;
    type: 'material' | 'exam';
    description: string;
    tags: string[];
    time: number;
}

export type TSection = 'listening' | 'reading' | 'writing' | 'grammar' | 'speaking';