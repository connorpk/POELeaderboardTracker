import { Character } from './character.interace';
import { AccountInfo } from './accountInfo.interface';

export interface Account{
    rank: number;
    dead: boolean;
    online: boolean;
    character: Character;
    account: AccountInfo;
}