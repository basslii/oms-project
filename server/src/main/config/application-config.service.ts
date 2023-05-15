import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplicationConfigService {
    private endpointPrefix: string | null = '';
    private microFrontEnd: boolean = false;

    setEndpointPrefix(endpointPrefix: string): void {
        this.endpointPrefix = endpointPrefix;
    }

    setMicroFrontend(microFrontend = true): void {
        this.microFrontEnd = microFrontend;
    }

    isMicroFrontend(): boolean {
        return this.microFrontEnd;
    }

    getEndpointFor(api: string, microService?: string): string {
        return microService ? `${this.endpointPrefix}services/${microService}/${api}` : `${this.endpointPrefix}${api}`
    }
}