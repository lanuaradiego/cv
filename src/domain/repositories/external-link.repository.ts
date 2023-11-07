import ExternalLink from "../models/external-link.model";

export default interface ExternalLinkRepository {
    getExternalLinks(): Promise<ExternalLink[]>;
}