<script setup>
/** All Library Import */
import { inject, ref, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useProfileSettingStore } from '@/stores/profilesetting';
import { useRouter } from 'vue-router';

/** All Instance */
PageName.value = 'Change Password';
const profileSettingStore = useProfileSettingStore();
const router = useRouter();
const swal = inject('$swal')

profileSettingStore.router = router;
profileSettingStore.swal = swal;

/** All Variables */
const showPassword = ref(false)

const formData = reactive({
    old_password: null,
    password: null,
    confirmPassword: null,
})

const schema = reactive({
  old_password: 'required|min:4',
  password: 'required|min:4',
  confirmPassword: 'required|password_mismatch:@password',
})

/** All Methods */
const UpdatePassword = () => {
    profileSettingStore.updatePassword(formData);
}
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <vee-form :validation-schema="schema" @submit="UpdatePassword" validate-on-input enctype="multipart/form-data">
            <!-- Old Password -->
            <div class="mb-5">
                <label for="old_password" class="block text-sm font-bold text-gray-700 mb-1.5">Old Password <span class="text-rose-400">*</span></label>
                <vee-field type="password" name="old_password" id="old_password" v-model="formData.old_password" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Old Password" required />
                <ErrorMessage name="old_password" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-bold text-gray-700 mb-1.5">New Password <span class="text-rose-400">*</span></label>
                    <div class="flex">
                        <vee-field :type="showPassword ? 'text' : 'password'" name="password" id="password" v-model="formData.password" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="New Password" required />
                        <div class="bg-gray-200 py-2 px-3 rounded-r-md flex items-center justify-center shadow-sm cursor-pointer" @click="togglePassword">
                            <span class="text-gray-600 font-medium"><font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" /></span>
                        </div>
                    </div>
                    <ErrorMessage name="password" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Confirm Password -->
                <div>
                    <label for="confirmPassword" class="block text-sm font-bold text-gray-700 mb-1.5">Confirm Password <span class="text-rose-400">*</span></label>
                    <div class="flex">
                        <vee-field :type="showPassword ? 'text' : 'password'" name="confirmPassword" id="confirmPassword" v-model="formData.confirmPassword" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Confirm Password" required />
                        <div class="bg-gray-200 py-2 px-3 rounded-r-md flex items-center justify-center shadow-sm cursor-pointer" @click="togglePassword">
                            <span class="text-gray-600 font-medium"><font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" /></span>
                        </div>
                    </div>
                    <ErrorMessage name="confirmPassword" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Update
            </button>
        </vee-form>
    </div>
</template>