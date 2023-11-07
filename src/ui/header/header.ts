import "../components/animated-button/animated-button.css"
import "../components/animated-button/animated-button-collision.css"
import "../components/animated-button/animated-button-diagonal-close.css"
import CommBus from "../../core/comm-bus/comm-bus";
import Logger from "../../core/logger/logger";
import MicroFrontend from "../../core/screen/screen";
import { NAVIGATE_CONTENT_EVENT, NavigateEvent } from "../components/scaffold/scaffold";

export default class Header extends MicroFrontend {

    constructor(
        logger: Logger,
        private readonly commBus: CommBus
    ) {
        super(
            "Main-Header",
            "./ui/header/header.html",
            logger,
        );
    }

    public onCreate(): void {
    }
    public onAdded(parent: HTMLElement): void {
        (parent.querySelector("#header-version-web") as HTMLAnchorElement).onclick = () => this.onClickVersionWeb();
        (parent.querySelector("#header-version-paper") as HTMLAnchorElement).onclick = () => this.onClickVersionPaper();
    }
    public onRemoved(oldParent: HTMLElement): void {
    }
    public onDisposed(): void {
    }

    private onClickVersionWeb() {
        const ev: NavigateEvent = new CustomEvent(
            NAVIGATE_CONTENT_EVENT,
            {
                detail: {
                    screenName: "content-web",
                }
            }
        );
        this.commBus.dispatchEvent(ev);
    }

    private onClickVersionPaper() {
        const ev: NavigateEvent = new CustomEvent(
            NAVIGATE_CONTENT_EVENT,
            {
                detail: {
                    screenName: "content-paper",
                }
            }
        );
        this.commBus.dispatchEvent(ev);
    }
}