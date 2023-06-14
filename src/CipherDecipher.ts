export default interface CipherDecipher {
    cipher(text:string):CipherType;
    decipher (cipher:CipherType): string;
    updateKey(): void;
}