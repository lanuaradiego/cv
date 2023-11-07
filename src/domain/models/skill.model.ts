export default class Skill {
    constructor(
        public readonly name: string,
        public readonly level: 1 | 2 | 3 | 4 | 5 | "n/a",
        public readonly description: string,
        public readonly subSkills: Skill[] | null,
    ) { }
}