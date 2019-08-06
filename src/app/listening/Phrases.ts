export class Phrases {
    phrases: Array<string>;

    constructor() {
        this.phrases = [
            'dados secretos',
            'gatinhos',
            'El Dorado',
            'Atlântida',
            "um McDonald's",
            'uma cerveja'
        ];
    }

    getPhrase(): string {
        const i = Math.floor(Math.random() * (this.phrases.length));
        return this.phrases[i];
    }
}