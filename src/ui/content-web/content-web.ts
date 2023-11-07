import "../components/card/card.css"
import "../components/tree-view/tree-view.css"
import "../components/tag/tag.css"
import "../components/line-separator/line-separator.css"
import CommBus from "../../core/comm-bus/comm-bus";
import Logger from "../../core/logger/logger";
import MicroFrontend from "../../core/screen/screen";
import ExperienceRepository from "../../domain/repositories/experience.repository";
import Experience from "../../domain/models/experience.model";
import Tag from "../components/tag/tag";
import SkillRepository from "../../domain/repositories/skill.repository";
import Skill from "../../domain/models/skill.model";
import addLineSeparator from "../components/line-separator/line-separator";
import EducationRepository from "../../domain/repositories/education.repository";
import Education from "../../domain/models/education.model";
import TreeView, { TreeViewItem } from "../components/tree-view/tree-view";

export default class ContentWeb extends MicroFrontend {
    private static readonly SIDEBAR_VISIBLITY = "sidebar-visibility";

    constructor(
        logger: Logger,
        private readonly commBus: CommBus,
        private readonly expRepo: ExperienceRepository,
        private readonly skillRepo: SkillRepository,
        private readonly educationRepo: EducationRepository,
    ) {
        super(
            "Content-Web",
            "./ui/content-web/content-web.html",
            logger,
        );
    }

    public onCreate(): void {
    }
    public onAdded(parent: HTMLElement): void {
        location.hash = "web";
        this.expRepo.getExperiences().then(r => this.loadExperiences(parent, r));
        this.educationRepo.getEducation().then(r => this.loadEducation(parent, r));
        this.skillRepo.getAllSkills().then(r => this.loadSkills(parent, r));
        //
        this.showSidebar();
    }
    public onRemoved(oldParent: HTMLElement): void {
    }
    public onDisposed(): void {
    }

    private capitalize(s: string) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    private formatExperienceDate(from: Date, to: Date | null): string {
        const fromStr = `${this.capitalize(from.toLocaleString('default', { month: 'short' }))} ${from.getFullYear()}`;
        const toStr = to ?
            `${this.capitalize(to.toLocaleString('default', { month: 'short' }))} ${to.getFullYear()}` :
            "Current";
        return `${toStr} - ${fromStr}`;
    }

    private loadExperiences(parent: HTMLElement, experiences: Experience[]): void {
        const workExpContainer = parent.querySelector("#work-experience") as HTMLDivElement;
        const tempExp = parent.querySelector("#template-experience") as HTMLTemplateElement;
        const tempExpSub = parent.querySelector("#template-experience-sub") as HTMLTemplateElement;
        experiences.forEach((exp, index) => {
            const expHtml = this.createHtmlExperience(tempExp);
            this.loadHtmlExperience(exp, expHtml);
            workExpContainer.appendChild(expHtml.content);

            exp.subExperiencie?.forEach(subExp => {
                const expSubHtml = this.createHtmlExperience(tempExpSub);
                this.loadHtmlExperience(subExp, expSubHtml);
                workExpContainer.appendChild(expSubHtml.content);
            });

            if (index < experiences.length - 1)
                addLineSeparator(workExpContainer);
        });
    }

    private createHtmlExperience(expTemplate: HTMLTemplateElement): HTMLExperienceElement {
        const node = expTemplate.content.cloneNode(true);
        const contentExp = (node as HTMLElement).firstElementChild as HTMLDivElement;
        const titleExp = this.getHtmlTitle(contentExp);
        let dateExp: HTMLSpanElement, descExp: HTMLSpanElement;
        [dateExp, descExp] = contentExp.getElementsByTagName("span");
        return {
            content: contentExp,
            date: dateExp,
            desc: descExp,
            title: titleExp,
        };
    }

    private getHtmlTitle(contentExp: HTMLDivElement): HTMLHeadingElement {
        const arr = contentExp.getElementsByTagName("h3");
        return arr.length ? arr[0] : contentExp.getElementsByTagName("h4")[0];
    }

    private loadHtmlExperience(exp: Experience, expHtml: HTMLExperienceElement): void {
        expHtml.title.innerText = `${exp.position} - ${exp.name}`;
        expHtml.date.innerText = this.formatExperienceDate(exp.from, exp.to);
        expHtml.desc.innerText = exp.description;
        exp.skills?.forEach(skill => {
            const tag = Tag.create();
            this.getSkillTagColor(skill).then(color => tag.pointColor = color);
            tag.text = skill.name;
            expHtml.content.appendChild(tag.htmlElement);
        });
    }

    private async getSkillTagColor(skill: Skill): Promise<string>;
    private async getSkillTagColor(skillName: string): Promise<string>;
    private async getSkillTagColor(skill: Skill | string): Promise<string> {
        const name = typeof skill === "string" ? skill : skill.name;
        const cmp: (skillName: string) => boolean = skillName => skillName == name;
        const color =
            name == "Android" || await this.skillRepo.findSkill((await this.skillRepo.getAndroidSkills()).subSkills!!, cmp) ? "#80C660" :
                name == "Web" || await this.skillRepo.findSkill((await this.skillRepo.getWebSkills()).subSkills!!, cmp) ? "#4FA8DB" :
                    name == "C# .NET" || await this.skillRepo.findSkill((await this.skillRepo.getCSharpSkills()).subSkills!!, cmp) ? "#A179DC" :
                        name == "Databases" || await this.skillRepo.findSkill((await this.skillRepo.getDatabasesSkills()).subSkills!!, cmp) ? "#1A0FBA" :
                            name == "Planning" || await this.skillRepo.findSkill((await this.skillRepo.getPlanningToolSkills()).subSkills!!, cmp) ? "#FF5454" :
                                name == "DevOps" || await this.skillRepo.findSkill((await this.skillRepo.getDevopsSkills()).subSkills!!, cmp) ? "#FF8C4A" :
                                    "#878787"
        return color;
    }

    private loadEducation(parent: HTMLElement, education: Education[]) {
        const container = parent.querySelector("#education-card") as HTMLDivElement;
        const template = parent.querySelector("#template-experience") as HTMLTemplateElement;
        education.forEach((edu, index) => {
            const html = this.createHtmlExperience(template);
            this.loadHtmlEducation(edu, html);
            container.appendChild(html.content);

            if (index < education.length - 1)
                addLineSeparator(container);
        });
    }

    private loadHtmlEducation(edu: Education, html: HTMLExperienceElement) {
        html.title.innerText = edu.name;
        html.date.innerText = this.formatEducationDate(edu.from, edu.to);
        html.desc.innerText = edu.description;
    }

    private formatEducationDate(from: Date, to: Date | null): string {
        const fromStr = `${this.capitalize(from.toLocaleString('default', { month: 'short' }))} ${from.getFullYear()}`;
        if (to === null || from.getFullYear() == to.getFullYear() && from.getMonth() == to.getMonth()) {
            return fromStr;
        }
        const toStr = `${this.capitalize(to.toLocaleString('default', { month: 'short' }))} ${to.getFullYear()}`;
        return `${toStr} - ${fromStr}`;
    }

    private loadSkills(parent: HTMLElement, skills: Skill[]) {
        const container = parent.querySelector("#skill-card")!;
        const treeView = this.getSkillsTreeView(skills);
        treeView.htmlElement.style.marginLeft = "12px";
        for (const treeItem of treeView.getItemIterator()) {
            const skillName = TreeView.getText(treeItem);
            this.getSkillTagColor(skillName).then(color => {
                TreeView.setCircleColor(treeItem, color);
                TreeView.setLineColor(treeItem, color);
            });
        }
        container.appendChild(treeView.htmlElement);
    }

    private getSkillsTreeView(skills: Skill[]): TreeView {
        const treeView = TreeView.create();
        skills.forEach(skill => {
            const item: TreeViewItem = {
                text: skill.name,
            };
            if (skill.description != "") {
                item.note = skill.description;
            }
            if (skill.subSkills?.length) {
                item.treeview = this.getSkillsTreeView(skill.subSkills);
            }
            const treeItem = treeView.addItem(item);
        });
        return treeView;
    }

    private showSidebar() {
        this.commBus.dispatchEvent(
            new CustomEvent(
                ContentWeb.SIDEBAR_VISIBLITY,
                {
                    detail: {
                        visibility: true,
                    }
                }
            )
        );
    }

}

type HTMLExperienceElement = { content: HTMLDivElement, title: HTMLHeadingElement, date: HTMLSpanElement, desc: HTMLSpanElement };