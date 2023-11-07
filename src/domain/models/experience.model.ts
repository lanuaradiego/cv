import Skill from "./skill.model";

export default class Experience {
    constructor(
        public readonly name: string,
        public readonly position: string,
        public readonly phone: string | null,
        public readonly from: Date,
        public readonly to: Date | null,
        public readonly description: string,
        public readonly skills: Skill[] | null,
        public readonly subExperiencie: Experience[] | null,
    ) { }
}