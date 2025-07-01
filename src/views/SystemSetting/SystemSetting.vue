<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useSystemSettingStore } from '@/stores/systemsetting';
import { useRouter } from 'vue-router';

/** All Instance */
PageName.value = 'General Setting';
const systemSettingStore = useSystemSettingStore();
const router = useRouter();
const swal = inject('$swal')

systemSettingStore.router = router;
systemSettingStore.swal = swal;

/** All Variables */
const schema = reactive({
  site_name: 'required|max:255',
  site_tagline: 'required|max:255',
  site_email: 'required|email|max:255',
  site_phone: 'required|min:7|max:15',
  site_facebook_link: 'required|url|max:255',
  site_timezone: 'required',
  site_address: 'required',
  meta_keywords: 'required',
  meta_description: 'required',
  meta_author: 'required|max:255',
})

/** All Methods */
const UpdateSetting = () => {
    systemSettingStore.updateSetting(systemSettingStore.settingData, 1);
}

/** Hook & Computed */
onMounted(() => {
    systemSettingStore.systemSettingInfo();
    systemSettingStore.siteTimeZone();
})
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <vee-form :validation-schema="schema" @submit="UpdateSetting" validate-on-input>
            <div class="grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
                <!-- Site Name -->
                <div>
                    <label for="site-name" class="block text-sm font-bold text-gray-700 mb-1.5">Site Name <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="site_name" id="site-name" v-model="systemSettingStore.settingData.site_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Site Name" required />
                    <ErrorMessage name="site_name" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Site Tagline -->
                <div>
                    <label for="site-tagline" class="block text-sm font-bold text-gray-700 mb-1.5">Site Tagline <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="site_tagline" id="site-tagline" v-model="systemSettingStore.settingData.site_tagline" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Site Tagline" required />
                    <ErrorMessage name="site_tagline" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Site Email -->
                <div>
                    <label for="site-email" class="block text-sm font-bold text-gray-700 mb-1.5">Site Email <span class="text-rose-400">*</span></label>
                    <vee-field type="email" name="site_email" id="site-email" v-model="systemSettingStore.settingData.site_email" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Site Email" required />
                    <ErrorMessage name="site_email" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Site Phone -->
                <div>
                    <label for="site-phone" class="block text-sm font-bold text-gray-700 mb-1.5">Site Phone <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="site_phone" id="site-phone" v-model="systemSettingStore.settingData.site_phone" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Site Phone" required />
                    <ErrorMessage name="site_phone" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Site Facebook Link -->
                <div>
                    <label for="site-facebook-link" class="block text-sm font-bold text-gray-700 mb-1.5">Facebook Link <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="site_facebook_link" id="site-facebook-link" v-model="systemSettingStore.settingData.site_facebook_link" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Facebook Page Link" required />
                    <ErrorMessage name="site_facebook_link" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Site Timezone -->
                <div>
                    <label for="site-timezone" class="block text-sm font-bold text-gray-700 mb-1.5">Site Timezone <span class="text-rose-400">*</span></label>
                    <vee-field as="select" name="site_timezone" v-model="systemSettingStore.settingData.site_timezone" id="site_timezone" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
                        <option value="">Select A Timezone</option>
                        <option :value="index" v-for="(singleTimezone, index) in systemSettingStore.timeZoneList" :key="index">{{ singleTimezone }}</option>
                    </vee-field>
                    <ErrorMessage name="site_timezone" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Meta Keywords -->
                <div>
                    <label for="meta-keywords" class="block text-sm font-bold text-gray-700 mb-1.5">Meta Keywords <span class="text-rose-400">*</span></label>
                    <vee-field as="textarea" name="meta_keywords" id="meta-keywords" rows="2" v-model="systemSettingStore.settingData.meta_keywords" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Comma-separated keywords" required />
                    <ErrorMessage name="meta_keywords" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Meta Author -->
                <div>
                    <label for="meta-author" class="block text-sm font-bold text-gray-700 mb-1.5">Meta Author <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="meta_author" id="meta-author" v-model="systemSettingStore.settingData.meta_author" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Author/Organization" required />
                    <ErrorMessage name="meta_author" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Meta Description -->
                <div>
                    <label for="meta-description" class="block text-sm font-bold text-gray-700 mb-1.5">Meta Description <span class="text-rose-400">*</span></label>
                    <vee-field as="textarea" name="meta_description" id="meta-description" rows="3" v-model="systemSettingStore.settingData.meta_description" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Meta description content" required />
                    <ErrorMessage name="meta_description" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Site Address -->
                <div>
                    <label for="site-address" class="block text-sm font-bold text-gray-700 mb-1.5">Site Address <span class="text-rose-400">*</span></label>
                    <vee-field as="textarea" name="site_address" id="site-address" rows="3" v-model="systemSettingStore.settingData.site_address" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Full Address" required />
                    <ErrorMessage name="site_address" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Update
            </button>
        </vee-form>
    </div>
</template>