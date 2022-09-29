import type IApplicationSettings from "@/entities/interfaces/IApplicationSettings"
import { computed } from "@vue/reactivity";
import { inject, provide, reactive, type ComputedRef, toRaw } from "vue";
import { db } from '@/lib/db';
import { APP_SETTINGS_KEY } from '@/lib/constants';

const SETTINGS_IS_DRAWER_OPEN = "SETTINGS_IS_DRAWER_OPEN";
const SETTINGS_CHANGE_DRAWER_STATE = "SETTINGS_CHANGE_DRAWER_STATE";
let appSettings: IApplicationSettings;
export const loadApplicationSettings = async (): Promise<IApplicationSettings> => {
    let as = await db.appSettings.get(APP_SETTINGS_KEY);
    if (!as) {
        as = {} as IApplicationSettings;
        db.appSettings.put(as, APP_SETTINGS_KEY);
    }
    appSettings = as;
    return as;
}
export const initApplicationSettings = (): IUseApplicationSettings => {
    appSettings = reactive<IApplicationSettings>(appSettings);
    const getIsDrawerOpen = computed(() => appSettings.isDrawerOpen);
    const changeDrawerState = () => {
        appSettings.isDrawerOpen = !appSettings.isDrawerOpen;
        saveApplicationSettings();
    }
    provide(SETTINGS_IS_DRAWER_OPEN, getIsDrawerOpen);
    provide(SETTINGS_CHANGE_DRAWER_STATE, changeDrawerState);
    return useApplicationSettings();
}

export const useApplicationSettings = () => {
    return {
        IsDrawerOpen: inject(SETTINGS_IS_DRAWER_OPEN),
        changeDrawerState: inject(SETTINGS_CHANGE_DRAWER_STATE)
    } as IUseApplicationSettings
}

const saveApplicationSettings = () => {
    db.appSettings.put(toRaw(appSettings), APP_SETTINGS_KEY);
}

export interface IUseApplicationSettings {
    IsDrawerOpen: ComputedRef<boolean>,
    changeDrawerState: Function
}
