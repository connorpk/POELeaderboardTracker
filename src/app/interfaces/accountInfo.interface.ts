export interface AccountInfo{
    name: string;
    realm: string;
    challenges: Challenges;
    twitch: Twitch;
}
export interface Challenges{
    completedChalenger: number;
}
export interface Twitch{
    name: string;
}