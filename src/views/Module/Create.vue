<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useModuleStore } from '@/stores/module';
import { useRouter } from 'vue-router';

/** All Instance */
PageName.value = 'Create Module';
const moduleStore = useModuleStore();
const router = useRouter();
const swal = inject('$swal')

moduleStore.router = router;
moduleStore.swal = swal;

/** All Variables */
const formData = reactive({
    module_name: null
})

const schema = reactive({
  module_name: 'required|max:255',
})

/** All Methods */
const StoreModule = () => {
    moduleStore.storeModule(formData);
}
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Button -->
        <div v-if="$can('index', 'Module')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'modules' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>
        
        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="StoreModule" validate-on-input>
            <!-- Module Name -->
            <div>
                <label for="module-name" class="block text-sm font-bold text-gray-700 mb-1.5">Module Name <span class="text-rose-400">*</span></label>
                <vee-field type="text" name="module_name" id="module-name" v-model="formData.module_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Module Name" required />
                <ErrorMessage name="module_name" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create
            </button>
        </vee-form>
    </div>
</template>