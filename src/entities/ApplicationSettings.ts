import type IApplicationSettings from "@/entities/interfaces/IApplicationSettings";

export default class ApplicationSettings implements IApplicationSettings {
    public isDrawerOpen: boolean = true;
}