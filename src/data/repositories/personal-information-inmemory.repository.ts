import PersonalInformation from "../../domain/models/personal-information.model";
import PersonalInformationRepositoy from "../../domain/repositories/personal-information.repositoy";

export default class PersonalInformationInMemoryRepository implements PersonalInformationRepositoy {
    getPersonalInformation(): Promise<PersonalInformation> {
        return Promise.resolve(new PersonalInformation(
            "Diego Adrian",
            "Lanuara",
            "lanuaradiego@gmail.com",
            "DEV / Architect",
        ));
    }
}