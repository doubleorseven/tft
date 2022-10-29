<template>
    <div>
        <!-- <h1 class="marker:">{{$t('areas.settings.general-settings')}}</h1>
        <div class="flex flex-wrap flex-col h-full w-1/3  gap-4">
            <div class="settings-box">
                <h5>{{$t('areas.settings.dark-mode')}}</h5>
                <Checkbox :name="'dark-mode'" :state="(isDarkMode) ? true : false" @change=""></Checkbox>
            </div>
            <div class="settings-box">
                <h5>{{$t('areas.settings.my-name')}}</h5>
                <TextInput :modelValue="myNameValue || ''" :placeholder="'Enter name here'" :label="'Title'"
                    :required="true">
                </TextInput>
            </div>
        </div> -->
        <h1 class="mb-4 md:mb-0">{{ $t('areas.settings.db-actions') }}</h1>
        <div class="flex flex-wrap flex-col h-full w-1/3  gap-4">
            <div class="settings-box">
                <h5>{{ $t('areas.settings.export-db') }}</h5>
                <CreateButton @clicked="exportDB">
                    {{ $t('areas.settings.download') }}
                </CreateButton>
            </div>
            <div class="settings-box">
                <h5>{{ $t('areas.settings.clear-db') }}</h5>
                <CreateButton v-longpress="clearDB">
                    {{ $t('areas.settings.reset') }}
                </CreateButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import CreateButton from "@/components/shared/Actions/CreateButton.vue"
import { useDBManager } from '@/composables/useDBManager';
const { clearDB, exportDB } = useDBManager();

// import Checkbox from "@/components/shared/Forms/Checkbox.vue";
// import TextInput from "@/components/shared/Forms/TextInput.vue";
// import { useApplicationSettings } from '@/composables/useApplicationSettings';
// import { ref, watch } from "vue";

// const { isDrawerOpen,
//     changeDrawerState,
//     isDarkMode,
//     changeThemeMode,
//     myName,
//     updateMyName } = useApplicationSettings();
// const myNameValue = ref(myName);
// watch(myNameValue, (newVal) => { debugger; updateMyName(newVal); });

</script>