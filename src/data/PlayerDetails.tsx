
export class PlayerDetails{
    score:number=0
    level:number=0
    name:string=""
    diamonds:number=0

    constructor(level:number,score:number,diamonds:number,name:string){
        this.score=score
        this.level=level
        this.name=name
        this.diamonds=diamonds
    };
}