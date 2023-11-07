import Education from "../../domain/models/education.model";
import EducationRepository from "../../domain/repositories/education.repository";

export default class EducationInMemoryRepository implements EducationRepository {
    getEducation(): Promise<Education[]> {
        return Promise.resolve([
            new Education(
                "IBM Certified Advocate - Cloud v1 (IBM Professional Certification)",
                new Date(2021, 11, 29),
                new Date(2021, 11, 29),
                ""
            ),
            new Education(
                "Curso de habilidades blandas para liderazgo (course Grupo Abans)",
                new Date(2020, 6),
                new Date(2020, 7),
                ""
            ),
            new Education(
                "Informatics Engineering (university UNLaM)",
                new Date(2010, 2),
                new Date(2018, 11),
                "Not completed. Third year of a six-year program."
            ),
            new Education(
                "Electronics Technician (High school E.E.T. N°4 Primera Brigada Aerea, El Palomar)",
                new Date(2004, 2),
                new Date(2009, 11),
                ""
            )
        ]);
    }
}