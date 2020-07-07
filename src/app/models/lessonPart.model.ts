export class LessonPart{
    id: string;
    content: string;
    chapterId: string;
    stepNumber: number;

    constructor(obj){
        this.id = obj.id || null;
        this.chapterId = obj.chapterId || null;
        this.content = obj.content || null;
        this.stepNumber = obj.stepNumber || 0;
    }

}