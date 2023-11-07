import PersonalInformation from "../models/personal-information.model";

export default interface PersonalInformationRepositoy {
    getPersonalInformation(): Promise<PersonalInformation>;
}