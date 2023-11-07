export default class Education {
    constructor(
        public readonly name: string,
        public readonly from: Date,
        public readonly to: Date | null,
        public readonly description: string,
    ) { }
} 