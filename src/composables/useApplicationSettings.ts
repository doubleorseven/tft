import ApplicationSettings from "@/entities/ApplicationSettings"
import { computed } from "@vue/reactivity";
import { inject, provide, readonly, reactive, type ComputedRef } from "vue";

const SETTINGS_IS_DRAWER_OPEN = "SETTINGS_IS_DRAWER_OPEN";
const SETTINGS_CHANGE_DRAWER_STATE = "SETTINGS_CHANGE_DRAWER_STATE";

export const loadApplicationSettings = () => {
    const appSettings = reactive(new ApplicationSettings());

    const getIsDrawerOpen = computed(() => appSettings.isDrawerOpen);
    const changeDrawerState = () => {
        appSettings.isDrawerOpen = !appSettings.isDrawerOpen;
        console.log(appSettings.isDrawerOpen);
    }
    provide(SETTINGS_IS_DRAWER_OPEN, getIsDrawerOpen);
    provide(SETTINGS_CHANGE_DRAWER_STATE, changeDrawerState);

}
export const useApplicationSettings = () => {
    return {
        IsDrawerOpen: inject(SETTINGS_IS_DRAWER_OPEN),
        changeDrawerState: inject(SETTINGS_CHANGE_DRAWER_STATE)
    } as IUseApplicationSettings
}

export interface IUseApplicationSettings {
    IsDrawerOpen: ComputedRef<boolean>,
    changeDrawerState: Function
}
