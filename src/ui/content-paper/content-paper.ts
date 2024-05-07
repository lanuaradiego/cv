import applier from "../../core/applier/applier";
import CommBus from "../../core/comm-bus/comm-bus";
import StateFlow from "../../core/flow/state-flow";
import Logger from "../../core/logger/logger";
import MicroFrontend from "../../core/screen/screen";
import Education from "../../domain/models/education.model";
import Experience from "../../domain/models/experience.model";
import ExternalLink from "../../domain/models/external-link.model";
import PersonalInformation from "../../domain/models/personal-information.model";
import Skill from "../../domain/models/skill.model";
import EducationRepository from "../../domain/repositories/education.repository";
import ExperienceRepository from "../../domain/repositories/experience.repository";
import ExternalLinkRepository from "../../domain/repositories/external-link.repository";
import PersonalInformationRepositoy from "../../domain/repositories/personal-information.repositoy";
import SkillRepository from "../../domain/repositories/skill.repository";
import AnimatedBar from "../components/animated-bar/animated-bar";

export default class ContentPaper extends MicroFrontend {
    private static readonly SIDEBAR_VISIBLITY = "sidebar-visibility";

    constructor(
        logger: Logger,
        private readonly commBus: CommBus,
        private readonly personalRepo: PersonalInformationRepositoy,
        private readonly expRepo: ExperienceRepository,
        private readonly skillRepo: SkillRepository,
        private readonly educationRepo: EducationRepository,
        private readonly linksRepo: ExternalLinkRepository,
    ) {
        super(
            "Content-Paper",
            "./ui/content-paper/content-paper.html",
            logger,
        );
    }

    public onCreate(): void {

    }
    public onAdded(parent: HTMLElement): void {
        this.initQr(parent);
        Promise.all([
            this.personalRepo.getPersonalInformation().then(r => this.initPersonalInformation(parent, r)),
            this.linksRepo.getExternalLinks().then(r => this.initExternalLinks(parent, r)),
            this.educationRepo.getEducation().then(r => this.initEducation(parent, r)),
            this.expRepo.getExperiences().then(r => this.initWorkExperience(parent, r)),
            this.skillRepo.getAllSkills().then(r => {
                this.initSkillSummary(parent, r);
                this.initSkill(parent, r);
            }),
        ]).then(() => {
            (parent.querySelector("#download-button") as HTMLElement).onclick = () => this.onDownloadButtonClicked();
        });
        //
        this.hideSidebar();
    }
    public onRemoved(oldParent: HTMLElement): void {

    }
    public onDisposed(): void {

    }

    private initQr(parent: HTMLElement) {
        const container = parent.querySelector("#qr-container")!;
        const img = container.querySelector("img")!;
        img.onload = _ => container.querySelector("span")!.style.display = "block";
        img.onerror = _ => container.remove();
        img.src = `https://image-charts.com/chart?chs=100x100&cht=qr&chl=${encodeURI(location.href)}`;
    }

    private initPersonalInformation(parent: HTMLElement, info: PersonalInformation) {
        (parent.querySelector("#info-name") as HTMLHeadingElement).innerText = `${info.name} ${info.surname}`;
        (parent.querySelector("#info-profession") as HTMLSpanElement).innerText = info.profession;
        (parent.querySelector("#info-mail") as HTMLAnchorElement).innerText = info.mail;
        const spanMail = parent.querySelector("#info-mail") as HTMLAnchorElement
        spanMail.innerText = info.mail;
        spanMail.href = `mailto:${info.mail}`;
    }

    private initExternalLinks(parent: HTMLElement, links: ExternalLink[]) {
        const container = parent.querySelector("#info-container") as HTMLElement;
        const template = parent.querySelector("#template-info-line") as HTMLTemplateElement;
        links.forEach(link => {
            const html = this.createHtmlExternalLink(template);
            this.loadExternalLink(html, link);
            container.appendChild(html.content);
        });
    }

    private initEducation(parent: HTMLElement, education: Education[]) {
        const container = parent.querySelector("#education-container") as HTMLUListElement;
        const template = parent.querySelector("#template-education-item") as HTMLTemplateElement;
        education.forEach(edu => {
            const html = this.createHtmlEducationItem(template);
            this.loadEducationItem(html, edu);
            container.appendChild(html.content);
        });
    }

    private initWorkExperience(parent: HTMLElement, experience: Experience[]) {
        const container = parent.querySelector("#experience-container") as HTMLUListElement;
        const template = parent.querySelector("#template-work-experience") as HTMLTemplateElement;
        experience.forEach(exp => {
            const html = this.createHtmlWorkExperience(template);
            this.loadWorkExperience(html, exp, true);
            if (exp.subExperiencie) {
                exp.subExperiencie.forEach(subExp => {
                    const ul = document.createElement("ul");
                    const htmlSub = this.createHtmlWorkExperience(template);
                    this.loadWorkExperience(htmlSub, subExp, false);
                    ul.appendChild(htmlSub.content);
                    html.content.appendChild(ul);
                });
            }
            container.appendChild(html.content);
        });
    }

    private createHtmlExternalLink(template: HTMLTemplateElement): HTMLExternalLinkElement {
        const node = template.content.cloneNode(true);
        const content = (node as HTMLElement).firstElementChild as HTMLDivElement;
        const img = content.getElementsByTagName("img")[0];
        const anchor = content.getElementsByTagName("a")[0];
        return { content, img, anchor, };
    }

    private loadExternalLink(html: HTMLExternalLinkElement, link: ExternalLink) {
        html.img.src = link.icon;
        html.img.alt = link.name;
        html.anchor.href = link.link;
        html.anchor.innerText = link.link;
    }

    private createHtmlEducationItem(template: HTMLTemplateElement): HTMLEducationItemElement {
        const node = template.content.cloneNode(true);
        const content = (node as HTMLElement).firstElementChild as HTMLLIElement;
        const spans = content.getElementsByTagName("span");
        return {
            content,
            to: spans[0],
            from: spans[1],
            name: spans[2],
            desc: spans[3],
        };
    }

    private loadEducationItem(html: HTMLEducationItemElement, edu: Education) {
        html.to.innerText = edu.to ? edu.to.getFullYear() + "" : "Current";
        const from = edu.from.getFullYear() + "";
        if (html.to.innerText != from) {
            html.from.innerText = ` - ${from}`;
        }
        html.name.innerText = `| ${edu.name}`;
        if (edu.description != "") {
            html.name.innerText += ". ";
            html.desc.innerText = edu.description;
        }
    }

    private createHtmlWorkExperience(template: HTMLTemplateElement): HTMLWorkExperienceElement {
        const node = template.content.cloneNode(true);
        const content = (node as HTMLElement).firstElementChild as HTMLLIElement;
        const spans = content.getElementsByTagName("span");
        return {
            content,
            to: spans[0],
            from: spans[1],
            name: spans[2],
            position: spans[3],
            desc: spans[4],
            skills: spans[5],
        };
    }

    private loadWorkExperience(html: HTMLWorkExperienceElement, exp: Experience, completeName: boolean) {
        html.to.innerText = exp.to ? exp.to.getFullYear() + "" : "Current";
        const from = exp.from.getFullYear() + "";
        if (html.to.innerText != from) {
            html.from.innerText = ` - ${from}`;
        }
        html.name.innerText = completeName ? `| ${exp.name} |` : '|';
        html.position.innerText = exp.position;
        if (exp.description != "") {
            html.position.innerText += '\n';
            html.desc.innerText = exp.description;
        }
        let skills = "";
        exp.skills?.forEach((skill, i) => {
            skills += skill.name + (i < exp.skills!.length - 1 ? ", " : "");
        });
        if (skills != "") {
            html.skills.innerText = `\nSkills: ${skills}.`;
        }
    }

    private initSkillSummary(parent: HTMLElement, skills: Skill[]) {
        const container = parent.querySelector("#skill-summary-container") as HTMLElement;
        skills.forEach(skill => {
            if (skill.level != "n/a") {
                const bar = applier(document.createElement("div"), d => {
                    d.className += " skill";
                });
                const title = applier(document.createElement("h6"), h => {
                    h.innerText = skill.name;
                });
                const level = applier(document.createElement("h6"), h => {
                    h.innerText = "★".repeat(skill.level as number) +
                        "☆".repeat(5 - (skill.level as number));
                    h.style.position = "absolute";
                    h.style.right = "0";
                });
                bar.appendChild(title);
                bar.appendChild(level);
                container.appendChild(bar);
            }
        });
    }

    private levelToPercent(level: 1 | 2 | 3 | 4 | 5): 20 | number | 100 {
        return level * 20;
    }

    private initSkill(parent: HTMLElement, skills: Skill[]) {
        this.loadSkillPage(parent.querySelector("#skill-container1")!, 0, 5, skills);
        this.loadSkillPage(parent.querySelector("#skill-container2")!, 6, skills.length, skills);
    }

    private loadSkillPage(page: Element, from: number, to: number, skills: Skill[]) {
        for (let i = from; i < to; ++i) {
            const sk = skills[i];
            const ul = document.createElement("ul");
            ul.className = "skill-main";
            this.loadSkillList(ul, sk);
            page.appendChild(ul);
        }
    }

    private loadSkillList(ul: HTMLUListElement, skill: Skill) {
        const li = document.createElement("li");
        li.appendChild(
            applier(
                document.createElement("span"),
                span => span.innerText = skill.name
            )
        );
        if (skill.description.length > 0) {
            li.appendChild(
                applier(
                    document.createElement("span"),
                    span => {
                        span.innerText = ` - ${skill.description}`;
                        span.className = "skill-desc";
                    }
                )
            );
        }
        if (skill.subSkills?.length) {
            const ulSub = document.createElement("ul");
            skill.subSkills.forEach(subSkill => this.loadSkillList(ulSub, subSkill));
            li.appendChild(ulSub)
        }
        ul.appendChild(li);
    }

    private onDownloadButtonClicked() {
        print();
    }

    private hideSidebar() {
        this.commBus.dispatchEvent(
            new CustomEvent(
                ContentPaper.SIDEBAR_VISIBLITY,
                {
                    detail: {
                        visibility: false,
                    }
                }
            )
        );
    }
}

type HTMLExternalLinkElement = {
    content: HTMLDivElement,
    img: HTMLImageElement,
    anchor: HTMLAnchorElement,
}

type HTMLEducationItemElement = {
    content: HTMLLIElement,
    from: HTMLSpanElement,
    to: HTMLSpanElement,
    name: HTMLSpanElement,
    desc: HTMLSpanElement,
}

type HTMLWorkExperienceElement = {
    content: HTMLLIElement,
    from: HTMLSpanElement,
    to: HTMLSpanElement,
    name: HTMLSpanElement,
    position: HTMLSpanElement,
    desc: HTMLSpanElement,
    skills: HTMLSpanElement,
}