import CipherDecipher from "./CipherDecipher";
import keyConfig from "./config/key-config.json";
import CipherType from "./model/CipherType";
export default class ShiftCipher implements CipherDecipher{

    constructor(private _mapKey:Map<number, number> = new Map(), private _lastUpdate: number = new Date().getMilliseconds()){
        setInterval(this.updateKey, keyConfig.interval);
    }

    cipher(text: string): CipherType {
       const cipherText =  this.cipherAction(text, this._mapKey.get(this._lastUpdate));
        return {time: this._lastUpdate, cipherText: cipherText};
    }

    decipher(cipher: CipherType): string {
        const key = this._mapKey.get(cipher.time);
        return this.decipherAction(cipher.cipherText, key);
    }

    updateKey(): void {
        const key = this.getRandomNumber(keyConfig.min, keyConfig.max);
        this._lastUpdate = new Date().getMilliseconds();
        this._mapKey.set(this._lastUpdate, key);
    }

    private getRandomNumber (min:number, max:number):number {
        return Math.random() * (max - min) + min;
      }

      cipherAction (str:string, key:number): string{
        let res="";
        Array.from(str).forEach(s => {res+=String.fromCharCode(((key+s.charCodeAt(0))%("~".charCodeAt(0)-" ".charCodeAt(0))));
        });
        return res;
    }

        decipherAction (str:string, key:number): string{
            //here must be decipher!
            return ""
        }

}