<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useProfileSettingStore } from '@/stores/profilesetting';
import { useRouter } from 'vue-router';

/** All Instance */
PageName.value = 'Profile Setting';
const profileSettingStore = useProfileSettingStore();
const router = useRouter();
const swal = inject('$swal')

profileSettingStore.router = router;
profileSettingStore.swal = swal;

/** All Variables */
const schema = reactive({
  name: 'required|max:255',
  email: 'required|email|max:255',
  phone: 'required|min:7|max:15',
})

/** All Methods */
const UpdateProfile = () => {
    profileSettingStore.updateProfile(profileSettingStore.profileSettingData);
}

/** Hook & Computed */
onMounted(() => {
    profileSettingStore.profileSettingInfo();
})
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <vee-form :validation-schema="schema" @submit="UpdateProfile" validate-on-input enctype="multipart/form-data">
            <!-- Image -->
            <div class="mb-5">
                <label for="file" class="block text-sm font-bold text-gray-700 mb-1.5">Image <span class="text-rose-400">*</span></label>
                <FilePond 
                    name="file"
                    allow-multiple="false"
                    max-file-size="2MB"
                    accepted-file-types="image/png, image/jpeg"
                    label-idle="Drop files or <span class='filepond--label-action'>Browse</span>"
                    :files="profileSettingStore.files"
                    @updatefiles="profileSettingStore.uploadFile"
                />

                <img :src="profileSettingStore.profileIamge" class="w-16 h-16" alt="">
            </div>
            <!-- Name -->
            <div class="mb-5">
                <label for="name" class="block text-sm font-bold text-gray-700 mb-1.5">Name <span class="text-rose-400">*</span></label>
                <vee-field type="text" name="name" id="name" v-model="profileSettingStore.profileSettingData.name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Name" required />
                <ErrorMessage name="name" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-bold text-gray-700 mb-1.5">Email <span class="text-rose-400">*</span></label>
                    <vee-field type="email" name="email" id="email" v-model="profileSettingStore.profileSettingData.email" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Email" required />
                    <ErrorMessage name="email" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Phone -->
                <div>
                    <label for="phone" class="block text-sm font-bold text-gray-700 mb-1.5">Phone <span class="text-rose-400">*</span></label>
                    <vee-field type="tel" name="phone" id="phone" v-model="profileSettingStore.profileSettingData.phone" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Phone" required />
                    <ErrorMessage name="phone" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Update
            </button>
        </vee-form>
    </div>
</template>