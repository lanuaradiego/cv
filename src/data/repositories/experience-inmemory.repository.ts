import Experience from "../../domain/models/experience.model";
import Skill from "../../domain/models/skill.model";
import ExperienceRepository from "../../domain/repositories/experience.repository";
import SkillRepository from "../../domain/repositories/skill.repository";

export default class ExperienceInMemoryRepository implements ExperienceRepository {
    constructor(
        private skillRepo: SkillRepository,
    ) { }

    getExperiences(): Promise<Experience[]> {
        return Promise.all([
            this.getExperienceICBC(),
            this.getExperienceIBM(),
            this.getExpcerienceGalileo(),
            this.getExperienceSilogic(),
        ])
    }

    private async getSkillOrThrow(skillName: string): Promise<Skill> {
        const skill = await this.skillRepo.getSkill(skillName);
        if (skill)
            return skill;
        throw new Error(`Skill not found: "${skillName}"`);
    }

    private async getExperienceICBC(): Promise<Experience> {
        return new Experience(
            "ICBC Argentina",
            "Mobile Android Architect",
            null,
            new Date(2024, 9, 10),
            null,
            "ICBC's hybrid applications, home banking (https://play.google.com/store/apps/details?id=com.icbc.mobile.abroadARG) and YOY (https://play.google.com/store/apps/details?id=com.icbc.mobile.ds):"
            + "\n- Communication between the application cells (15 cells) and the Solution Mobile Architecture team."
            + "\n- Managing the lifecycle on Google Play Console, analyzing crashes, ANRs (Application Not Responding) and feedback."
            + "\n- Compiling applications and distributing them among the cells."
            + "\n- Initial issue analysis: Are the issues Android-related or web-related?"
            + "\n- Identifying pain points, potential solutions and defining specific actions for each application."
            + "\n- Defining, documenting and validating the use of design patterns in the applications."
            + "\n- Conducting PoCs (Proof of Concepts) on new technologies products, and/or frameworks."
            + "\n- Ensuring that projects comply with standards, patterns and best practices."
            ,
            [
                await this.getSkillOrThrow("Android"),
                await this.getSkillOrThrow("Apache Cordova 10/11"),
                await this.getSkillOrThrow("Java"),
                await this.getSkillOrThrow("Kotlin"),
                await this.getSkillOrThrow("Visual Paradigm"),
                await this.getSkillOrThrow("Testing"),
                await this.getSkillOrThrow("XML"),
                await this.getSkillOrThrow("Jetpack Compose"),
                await this.getSkillOrThrow("Web"),
                await this.getSkillOrThrow("Typescript"),
                await this.getSkillOrThrow("Bash"),
                await this.getSkillOrThrow("Google Play Console"),
                await this.getSkillOrThrow("Appstore Development"),
            ],
            null
        )
    }

    private async getExperienceIBM(): Promise<Experience> {
        return new Experience(
            "IBM Argentina (Consulting, Banking)",
            "Mobile Android Architect",
            null,
            new Date(2021, 1, 8),
            new Date(2024, 9, 9),
            "ICBC's hybrid applications.",
            [],
            null
        )
    }

    private async getExpcerienceGalileo(): Promise<Experience> {
        return new Experience(
            "Galileo Technologies (Oil&gas)",
            "Software Development Manager",
            "+54 11 4712 8000",
            new Date(2014, 6, 1),
            new Date(2021, 2, 5),
            "Management of SCADA systems for CNG/LNG compressors and logistics for gas transportation.",
            [
                await this.getSkillOrThrow("Android"),
                await this.getSkillOrThrow("Java"),
                await this.getSkillOrThrow("Kotlin"),
                await this.getSkillOrThrow("XML"),
                await this.getSkillOrThrow("Web"),
                await this.getSkillOrThrow("HTML5"),
                await this.getSkillOrThrow("CSS3"),
                await this.getSkillOrThrow("Typescript"),
                await this.getSkillOrThrow("Javascript"),
                await this.getSkillOrThrow(".NET Framework"),
                await this.getSkillOrThrow("Rest API"),
                await this.getSkillOrThrow("Azure Devops"),
                await this.getSkillOrThrow("Visual Paradigm"),
            ],
            [
                this.getExpcerienceGalileoManager(),
                this.getExpcerienceGalileoTeamLeader(),
                this.getExpcerienceGalileoScadaDeveloper(),
            ]
        );
    }

    private getExpcerienceGalileoManager(): Experience {
        return new Experience(
            "Galileo Technologies",
            "Software Development Manager",
            "+54 11 4712 8000",
            new Date(2019, 1, 1),
            new Date(2021, 2, 5),
            "Leadership of two multidisciplinary teams for the development of a SCADA system (.NET Framework) and a logistics system (.NET Framework + Android), planning the systems' lifecycle, and analyzing and designing cross-application architecture definitions.",
            null,
            null
        );
    }

    private getExpcerienceGalileoTeamLeader(): Experience {
        return new Experience(
            "Galileo Technologies",
            "Telemaintenance Project Leader",
            "+54 11 4712 8000",
            new Date(2016, 1, 1),
            new Date(2018, 11, 31),
            "Analysis, design, and development of a new SCADA system in C#.NET / HTML5 / TypeScript / PostgreSQL on Azure, proposed and implemented by me, which included a Modbus TCP/IP driver for communication with low-level PLCs (bits and pointers).",
            null,
            null
        );
    }

    private getExpcerienceGalileoScadaDeveloper(): Experience {
        return new Experience(
            "Galileo Technologies",
            "SCADA Developer",
            "+54 11 4712 8000",
            new Date(2014, 6, 1),
            new Date(2015, 11, 31),
            "Development of SCADA in GE iFix 5.1 with VB6/VBA scripting, Historian, and WebSpace to monitor CNG and LNG compressors worldwide",
            null,
            null
        );
    }

    private getExperienceSilogic(): Experience {
        return new Experience(
            "Silogic Ingeniería y Automatización (Automation, Industry, Oil&Gas)",
            "SCADA Developer",
            "+54 11 4656 4349",
            new Date(2013, 1, 1),
            new Date(2014, 5, 15),
            "SCADA programmer using GE Fix 7.0 and iFix 5.1, with VB6/VBA scripting, for Galileo Technologies and the Bariloche hydroelectric power plant.",
            null,
            null
        );
    }
}
