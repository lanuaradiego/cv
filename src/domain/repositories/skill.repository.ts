import Skill from "../models/skill.model";

export default interface SkillRepository {
    getAllSkills(): Promise<Skill[]>;
    getSkill(skillName: string): Promise<Skill | null>;
    getAndroidSkills(): Promise<Skill>;
    getWebSkills(): Promise<Skill>;
    getCSharpSkills(): Promise<Skill>;
    getDatabasesSkills(): Promise<Skill>;
    getPlanningToolSkills(): Promise<Skill>;
    getDevopsSkills(): Promise<Skill>;
    getOthersSkills(): Promise<Skill>;
    findSkill(skills: Skill[], predicate: (skillName: string) => boolean): Promise<Skill|null>;
}