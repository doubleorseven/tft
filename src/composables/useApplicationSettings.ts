import type IApplicationSettings from "@/entities/interfaces/IApplicationSettings"
import { computed } from "@vue/reactivity";
import { inject, provide, reactive, type ComputedRef, toRaw } from "vue";
import { db } from '@/lib/db';
import { APP_SETTINGS_KEY } from '@/lib/constants';

const SETTINGS_IS_DRAWER_OPEN = "SETTINGS_IS_DRAWER_OPEN";
const SETTINGS_CHANGE_DRAWER_STATE = "SETTINGS_CHANGE_DRAWER_STATE";
const SETTINGS_IS_DARK_MORE = "SETTINGS_IS_DARK_MORE";
const SETTINGS_CHANGE_THEME_MODE = "SETTINGS_CHANGE_THEME_MODE";
const SETTINGS_GET_MY_NAME = "SETTINGS_GET_MY_NAME";
const SETTINGS_UPDATE_MY_NAME = "SETTINGS_UPDATE_MY_NAME";
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
export const initApplicationSettings = (): void => {
    appSettings = reactive<IApplicationSettings>(appSettings);
    //#region DRAWER_OPEN
    const getIsDrawerOpen = computed(() => appSettings.isDrawerOpen);
    const changeDrawerState = () => {
        appSettings.isDrawerOpen = !appSettings.isDrawerOpen;
        saveApplicationSettings();
    }
    provide(SETTINGS_IS_DRAWER_OPEN, getIsDrawerOpen);
    provide(SETTINGS_CHANGE_DRAWER_STATE, changeDrawerState);
    //#endregion
    //#region DARK_MODE
    const getIsDarkMode = computed(() => appSettings.isDarkMode);
    const changeThemeMode = () => {
        appSettings.isDarkMode = !appSettings.isDarkMode;
        saveApplicationSettings();
    }
    provide(SETTINGS_IS_DARK_MORE, getIsDarkMode);
    provide(SETTINGS_CHANGE_THEME_MODE, changeThemeMode);
    //#endregion
    //#region MY_NAME
    const getMyName = computed(() => appSettings.myName);
    const updateMyName = (name: string) => {
        appSettings.myName = name;
        saveApplicationSettings();
    }
    provide(SETTINGS_GET_MY_NAME, getMyName);
    provide(SETTINGS_UPDATE_MY_NAME, updateMyName);
    //#endregion


}

export const useApplicationSettings = () => {
    return {
        isDrawerOpen: inject(SETTINGS_IS_DRAWER_OPEN),
        changeDrawerState: inject(SETTINGS_CHANGE_DRAWER_STATE),
        isDarkMode: inject(SETTINGS_IS_DARK_MORE),
        changeThemeMode: inject(SETTINGS_CHANGE_THEME_MODE),
        myName: inject(SETTINGS_GET_MY_NAME),
        updateMyName: inject(SETTINGS_UPDATE_MY_NAME),
    } as IUseApplicationSettings
}

const saveApplicationSettings = () => {
    db.appSettings.put(toRaw(appSettings), APP_SETTINGS_KEY);
}

export interface IUseApplicationSettings {
    isDrawerOpen: ComputedRef<boolean>,
    changeDrawerState: Function,
    isDarkMode: ComputedRef<boolean>,
    changeThemeMode: Function,
    myName: ComputedRef<string>,
    updateMyName: Function,
}
