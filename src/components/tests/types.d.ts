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
    testId: number;
    section: TSection;
    task: string;
    text: string;
    possibleAnswers: string;
    correctAnswer: string;
}

export type TSection = 'listening' | 'reading' | 'writing' | 'grammar' | 'speaking';