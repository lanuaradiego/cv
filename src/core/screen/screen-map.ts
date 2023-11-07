import MicroFrontend from "./screen";

export default interface ScreenMap {
    [screenName: string]: ScreenFactory;
}

export type ScreenFactory = () => MicroFrontend;