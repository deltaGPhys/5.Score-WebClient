import { ThrowStmt } from '@angular/compiler';

export class Route {
    id: number;
    identifier: string;
    name: string;
    value: number;
    zone: number;
    // scoring system

    constructor(identifier: string, name: string, value: number, zone: number) {
        this.id = null;
        this.name = name;
        this.identifier = identifier;
        this.value = value;
        this.zone = zone;
    }
}


