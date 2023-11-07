import CommBus from "./core/comm-bus/comm-bus";
import LoggerComposite from "./core/logger/logger-composite";
import ConsoleLogger from "./core/logger/types/console-logger";
import ScreenManager from "./core/screen/screen-manager";
import ScreenMap from "./core/screen/screen-map";
import EducationInMemoryRepository from "./data/repositories/education-inmemory.repository";
import ExperienceInMemoryRepository from "./data/repositories/experience-inmemory.repository";
import ExternalLinkInMemoryRepository from "./data/repositories/external-link-inmemory.repository";
import PersonalInformationInMemoryRepository from "./data/repositories/personal-information-inmemory.repository";
import SkillInMemoryRepository from "./data/repositories/skill-inmemory.repository";
import Scaffold from "./ui/components/scaffold/scaffold";
import ContentPaper from "./ui/content-paper/content-paper";
import ContentWeb from "./ui/content-web/content-web";
import Footer from "./ui/footer/footer";
import Header from "./ui/header/header";
import Sidebar from "./ui/sidebar/sidebar";

const personalRepo = new PersonalInformationInMemoryRepository();
const skillRepo = new SkillInMemoryRepository();
const expRepo = new ExperienceInMemoryRepository(skillRepo);
const linkRepo = new ExternalLinkInMemoryRepository();
const educationRepo = new EducationInMemoryRepository();

const screenMap: ScreenMap = {
    "main-footer": () => new Footer(logger, commBus),
    "main-header": () => new Header(logger, commBus),
    "main-sidebar": () => new Sidebar(logger, commBus, personalRepo, linkRepo, skillRepo),
    "content-web": () => new ContentWeb(logger, commBus, expRepo, skillRepo, educationRepo),
    "content-paper": () => new ContentPaper(logger, commBus, personalRepo, expRepo, skillRepo, educationRepo, linkRepo),
}

const commBus = new CommBus();
const logger = new LoggerComposite()
    .addLogger(new ConsoleLogger());
const mfManager = new ScreenManager(logger, screenMap);

const scaffold = new Scaffold(
    "Main-Scaffold",
    "./ui/components/scaffold/scaffold.html",
    logger,
    mfManager,
    commBus,
);
Promise.all([
    scaffold.loadFooter("main-footer"),
    scaffold.loadHeader("main-header"),
    scaffold.loadSidebar("main-sidebar"),
]).then(() => {
    scaffold.loadContent(location.hash.endsWith("paper") ? "content-paper" : "content-web");
});
mfManager.loadScreen(scaffold, document.body);