export interface Character{
    id: string;
    name: string;
    level: number;
    class: string;
    time: number;
    experience: number;
    depth?: Delve;
}
export interface Delve{
    default: number;
    solo: number;
}