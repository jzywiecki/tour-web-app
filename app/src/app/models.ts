export class Trip{
    key: string = ''
    name: string = ''
    country: string = ''
    startDate: string = ''
    endDate: string = ''
    unitPrice: number = 0
    maxAttendance: number = 0
    description: string = ''
    photos: string[] = []
    rates: number[] = []
}

export class Review {
    tripID: string = '';
    nick: string = '';
    name: string = '';
    text: string = '';
    purchaseDate?: string;
}

export class User{
    constructor (
        public username: string,
        public banned: boolean = false,
        public email: string, 
        public role: string,
        public uid?: string,
        public key?: string) { }
}