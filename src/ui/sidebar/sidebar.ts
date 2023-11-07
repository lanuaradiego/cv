import "../components/card/card.css"
import "../components/animated-bar/animated-bar.css"
import CommBus from "../../core/comm-bus/comm-bus";
import Logger from "../../core/logger/logger";
import MicroFrontend from "../../core/screen/screen";
import PersonalInformationRepositoy from "../../domain/repositories/personal-information.repositoy";
import PersonalInformation from "../../domain/models/personal-information.model";
import ExternalLinkRepository from "../../domain/repositories/external-link.repository";
import ExternalLink from "../../domain/models/external-link.model";
import Skill from "../../domain/models/skill.model";
import SkillRepository from "../../domain/repositories/skill.repository";
import AnimatedBar from "../components/animated-bar/animated-bar";
import StateFlow from "../../core/flow/state-flow";
import MutableStateFlow from "../../core/flow/mutable-state-flow";

export default class Sidebar extends MicroFrontend {
    public static readonly COMMBUS_VISIBILITY = "sidebar-visibility";
    public static readonly EVENT_VISIBLITY = Sidebar.COMMBUS_VISIBILITY;

    private _visibility: MutableStateFlow<boolean>;

    public get visibility(): StateFlow<boolean> {
        return this._visibility;
    }

    constructor(
        logger: Logger,
        private readonly commBus: CommBus,
        private readonly personalRepo: PersonalInformationRepositoy,
        private readonly linkRepo: ExternalLinkRepository,
        private readonly skillRepo: SkillRepository,
    ) {
        super(
            "Main-Sidebar",
            "./ui/sidebar/sidebar.html",
            logger,
        );
        this._visibility = new MutableStateFlow(false);
    }

    private visibilityListener = (e: Event) => {
        if (this.isSidebarVisibilityEvent(e)) {
            this._visibility.setValue(e.detail.visibility);
        }
    };
    private onVisibilityChange = (visibile: boolean) => {
        const container = document.getElementById("sidebar-container");
        if (container) {
            if (visibile) {
                container.style.removeProperty("width");
                container.style.removeProperty("height");
                container.style.removeProperty("opacity");
            }
            else {
                container.style.width = "0";
                container.style.height = "0";
                container.style.opacity = "0";
            }
        }
    };

    public onCreate(): void {
    }
    public onAdded(parent: HTMLElement): void {
        // Load Data
        this.personalRepo.getPersonalInformation().then(r => this.addPersonalInfo(parent, r));
        this.linkRepo.getExternalLinks().then(r => this.addExternalLinks(parent, r));
        this.skillRepo.getAllSkills().then(r => this.addSkills(parent, r));
        // Events
        this.commBus.subscribeEvent(Sidebar.EVENT_VISIBLITY, this.visibilityListener);
        this.visibility.subscribe(this.onVisibilityChange);
        this.commBus.registerFlow(Sidebar.COMMBUS_VISIBILITY, this.visibility);
    }
    public onRemoved(oldParent: HTMLElement): void {
        this.commBus.unsubscribeEvent(Sidebar.EVENT_VISIBLITY, this.visibilityListener);
        this.visibility.unsubscribe(this.onVisibilityChange);
        this.commBus.removeFlow(Sidebar.COMMBUS_VISIBILITY);
    }
    public onDisposed(): void {
        this.commBus.unsubscribeEvent(Sidebar.EVENT_VISIBLITY, this.visibilityListener);
        this.visibility.unsubscribe(this.onVisibilityChange);
        this.commBus.removeFlow(Sidebar.COMMBUS_VISIBILITY);
    }

    private addPersonalInfo(parent: HTMLElement, personalInfo: PersonalInformation) {
        (parent.querySelector("#profile-name") as HTMLSpanElement).innerText =
            `${personalInfo.name} ${personalInfo.surname}`;
        (parent.querySelector("#profile-profession") as HTMLSpanElement).innerText =
            personalInfo.profession;

        const spanMail = parent.querySelector("#profile-mail") as HTMLAnchorElement
        spanMail.innerText = personalInfo.mail;
        spanMail.href = `mailto:${personalInfo.mail}`;
    }

    private addExternalLinks(parent: HTMLElement, links: ExternalLink[]) {
        const container = parent.querySelector("#profile-info-card") as HTMLElement;
        const template = parent.querySelector("#profile-external-link") as HTMLTemplateElement;
        links.forEach(link => {
            const html = this.createHtmlExternalLink(template);
            this.loadExternalLink(html, link);
            container.appendChild(html.content);
        });
    }

    private createHtmlExternalLink(template: HTMLTemplateElement): HTMLExternalLinkElement {
        const node = template.content.cloneNode(true);
        const content = (node as HTMLElement).firstElementChild as HTMLDivElement;
        const img = content.getElementsByTagName("img")[0];
        const anchor = content.getElementsByTagName("a")[0];
        anchor.target = "_blank";
        anchor.rel = "noopener";
        return { content, img, anchor, };
    }

    private loadExternalLink(html: HTMLExternalLinkElement, link: ExternalLink) {
        html.img.src = link.icon;
        html.img.alt = link.name;
        html.anchor.href = link.link;
        html.anchor.innerText = link.name;
    }

    private addSkills(parent: HTMLElement, skills: Skill[]) {
        const container = parent.querySelector("#profile-skill-card") as HTMLElement;
        skills.forEach(skill => {
            if (skill.level != "n/a") {
                const bar = AnimatedBar.create(skill.name, this.levelToPercent(skill.level));
                bar.htmlElement.className += " skill";
                container.appendChild(bar.htmlElement);
            }
        });
    }

    private levelToPercent(level: 1 | 2 | 3 | 4 | 5): 20 | number | 100 {
        return level * 20;
    }

    private isSidebarVisibilityEvent(e: Event): e is SidebarVisibilityEvent {
        return e
            && typeof (e as CustomEvent).detail === "object"
            && ((e as CustomEvent).detail as object).hasOwnProperty("visibility");
    }
}

type HTMLExternalLinkElement = {
    content: HTMLDivElement,
    img: HTMLImageElement,
    anchor: HTMLAnchorElement,
}

type SidebarVisibilityEvent = CustomEvent<{ visibility: boolean }>