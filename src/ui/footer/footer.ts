import "../components/animated-button/animated-button.css"
import "../components/animated-button/animated-button-collision.css"
import CommBus from "../../core/comm-bus/comm-bus";
import Logger from "../../core/logger/logger";
import MicroFrontend from "../../core/screen/screen";

export default class Footer extends MicroFrontend {

    constructor(
        logger: Logger,
        private readonly commBus: CommBus
    ) {
        super(
            "Main-Footer",
            "./ui/footer/footer.html",
            logger,
        )
    }

    public onCreate(): void {
    }
    public onAdded(parent: HTMLElement): void {
        (parent.querySelector("#footer-year") as HTMLSpanElement).innerText = new Date().getFullYear() + "";
    }
    public onRemoved(oldParent: HTMLElement): void {
    }
    public onDisposed(): void {
    }
}