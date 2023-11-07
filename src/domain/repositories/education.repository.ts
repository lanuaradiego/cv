import Education from "../models/education.model";

export default interface EducationRepository {
    getEducation(): Promise<Education[]>;
}