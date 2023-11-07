import Experience from "../models/experience.model";

export default interface ExperienceRepository {
    getExperiences(): Promise<Experience[]>;
}