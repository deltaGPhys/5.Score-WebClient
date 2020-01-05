export class Competition {
    id: number;
    gymId: number;
    name: string;

    constructor(id: number, gymId: number, name: string) {
        this.id = id;
        this.gymId = gymId;
        this.name = name;
    }
}
