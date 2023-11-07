export default class ExternalLink {
    constructor(
        public readonly name: string,
        public readonly link: string,
        public readonly icon: `data:image/${"png" | "jpg" | "jpeg" | "gif"};base64,${string}`,
    ) { }
}