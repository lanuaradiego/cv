import CommBus from "../../../core/comm-bus/comm-bus";
import Logger from "../../../core/logger/logger";
import MicroFrontend from "../../../core/screen/screen";
import ScreenManager from "../../../core/screen/screen-manager";

export default class Scaffold extends MicroFrontend {
    private header: MicroFrontend | null = null;
    private headerName: string | null = null;
    private headerHtml: HTMLElement | undefined;
    private sidebar: MicroFrontend | null = null;
    private sidebarName: string | null = null;
    private sidebarHtml: HTMLElement | undefined;
    private footer: MicroFrontend | null = null;
    private footerName: string | null = null;
    private footerHtml: HTMLElement | undefined;
    private content: MicroFrontend | null = null;
    private contentName: string | null = null;
    private contentHtml: HTMLElement | undefined;

    public constructor(
        name: string,
        url: string,
        logger: Logger,
        private readonly manager: ScreenManager,
        private readonly commBus: CommBus,
    ) {
        super(name, url, logger);
        commBus.subscribeEvent(NAVIGATE_CONTENT_EVENT, (e) => this.handleNavigateContent(e));
    }

    public onCreate(): void { }

    public onAdded(parent: HTMLElement): void {
        this.headerHtml = parent.querySelector("#scaffold-header") as HTMLElement;
        this.sidebarHtml = parent.querySelector("#scaffold-sidebar") as HTMLElement;
        this.footerHtml = parent.querySelector("#scaffold-footer") as HTMLElement;
        this.contentHtml = parent.querySelector("#scaffold-content") as HTMLElement;

        const sides: Promise<void>[] = [];
        if (this.headerName) {
            sides.push(this.loadHeader(this.headerName));
        }
        if (this.sidebarName) {
            sides.push(this.loadSidebar(this.sidebarName));
        }
        if (this.footerName) {
            sides.push(this.loadFooter(this.footerName));
        }

        Promise.all(sides).then(() => {
            if (this.contentName) {
                this.loadContent(this.contentName);
            }
        });
    }

    public onRemoved(oldParent: HTMLElement): void {
        this.dispose();
    }

    public onDisposed(): void {
        this.removeHeader();
        this.removeSidebar();
        this.removeFooter();
        this.removeContent();
    }

    public async loadHeader(screenName: string) {
        this.headerName = screenName;
        if (this.headerHtml)
            this.header = await this.manager.loadScreen(screenName, this.headerHtml);
    }

    public async loadSidebar(screenName: string) {
        this.sidebarName = screenName;
        if (this.sidebarHtml)
            this.sidebar = await this.manager.loadScreen(screenName, this.sidebarHtml)
    }

    public async loadFooter(screenName: string) {
        this.footerName = screenName;
        if (this.footerHtml)
            this.footer = await this.manager.loadScreen(screenName, this.footerHtml);
    }

    public async loadContent(screenName: string) {
        this.contentName = screenName;
        if (this.contentHtml)
            this.content = await this.manager.loadScreen(screenName, this.contentHtml);
    }

    public hasHeaderLoaded(): boolean {
        return !!this.header;
    }

    public hasSidebarLoaded(): boolean {
        return !!this.sidebar;
    }

    public hasFooterLoaded(): boolean {
        return !!this.footer;
    }

    public hasContentLoaded(): boolean {
        return !!this.content;
    }

    public removeHeader(): void {
        if (this.hasHeaderLoaded()) {
            this.manager.unloadScreen(this.header!);
            this.header = null;
            this.headerHtml = undefined;
        }
    }

    public removeSidebar(): void {
        if (this.hasSidebarLoaded()) {
            this.manager.unloadScreen(this.sidebar!);
            this.sidebar = null;
            this.sidebarHtml = undefined;
        }
    }

    public removeFooter(): void {
        if (this.hasFooterLoaded()) {
            this.manager.unloadScreen(this.footer!);
            this.footer = null;
            this.footerHtml = undefined;
        }
    }

    public removeContent(): void {
        if (this.hasContentLoaded()) {
            this.manager.unloadScreen(this.content!);
            this.content = null;
            this.contentHtml = undefined;
        }
    }

    private handleNavigateContent(e: Event): void {
        const ev = new CustomEvent(NAVIGATE_CONTENT_EVENT, { detail: 1 });
        if (this.isNavigateEvent(e)) {
            this.loadContent(e.detail.screenName);
        }
        else {
            this.logger.warn(`Invalid ${NAVIGATE_CONTENT_EVENT} event`, e);
        }
    }

    private isNavigateEvent(e: Event): e is NavigateEvent {
        return (e as NavigateEvent).detail!!
            && (e as NavigateEvent).detail.hasOwnProperty("screenName")
    }
}

export const NAVIGATE_CONTENT_EVENT = "navigate-content";
export type NavigateEvent = CustomEvent<{ screenName: string }>;