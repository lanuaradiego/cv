import Logger from "../logger/logger";
import Screen from "./screen";
import ScreenMap from "./screen-map";

export default class ScreenManager {
    private addedMfs = new Set<Screen>();

    public constructor(
        private logger: Logger,
        private screenMap: ScreenMap,
    ) { }

    public async loadScreen(screenName: string, parent: HTMLElement): Promise<Screen>;
    public async loadScreen(screen: Screen, parent: HTMLElement): Promise<Screen>;
    public async loadScreen(screenOrName: Screen | string, parent: HTMLElement): Promise<Screen> {
        const screen = typeof screenOrName === "string" ?
            this.screenMap[screenOrName]() :
            screenOrName;
        const loadedScreen = this.findScreenByParent(parent);
        if (loadedScreen !== screenOrName) {
            if (loadedScreen !== null) {
                this.removeScreen(loadedScreen);
                this.logger.info(`ScreenManager, Screen ${loadedScreen.name} has same parent that ${screen.name}. ${loadedScreen.name} parent unloaded`);
            }
            await screen.attachToParent(parent);
            this.logger.info(`ScreenManager, Screen ${screen.name} attached to parent`);
        }
        else
            this.logger.info(`ScreenManager, Screen ${screen.name} already loaded in same parent`);
        return screen;
    }

    public unloadScreen(Screen: Screen): boolean {
        return this.removeScreen(Screen);
    }

    private findScreenByParent(parent: HTMLElement): Screen | null {
        let Screen: Screen | null = null;
        this.addedMfs.forEach(mf => {
            if (mf.parentHtml === parent) {
                Screen = mf;
            }
        });
        return Screen;
    }

    private removeScreen(mf: Screen): boolean {
        const removed = this.addedMfs.delete(mf);
        mf.removeFromParent();
        this.logger.info(`ScreenManager, Screen ${mf.name} removed from parent`);
        return removed;
    }
}