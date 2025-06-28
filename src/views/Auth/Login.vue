<script setup>
/** All Library Import */
import { ref, reactive } from 'vue';

/** All Variables */
const formData = reactive({
    email: null,
    password: null,
})
const schema = reactive({
  email: 'required|email',
  password: 'required|min:4|max:25',
})
const showPassword = ref(false)

/** All Method */
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-teal-700/60">
        <div class="max-w-lg w-full mx-auto px-2">
            <div class="bg-white p-5 md:p-8 rounded-lg shadow-md">
                <h2 class="text-center text-3xl font-bold text-mainColor text-shadow-2xs">Sign In</h2>
                <p class="text-sm text-gray-500 font-medium text-center my-2">Welcome Back!</p>

                <!-- Login Form -->
                <vee-form :validation-schema="schema" validate-on-input>
                    <!-- Email -->
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-bold text-gray-700 mb-1.5">Email <span class="text-rose-400">*</span></label>
                        <vee-field type="email" name="email" id="email" v-model="formData.email" class="block w-full p-2.5 rounded-md border border-gray-200  focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Email" required />
                        <ErrorMessage name="email" class="text-xs text-rose-500 font-semibold my-2" />
                    </div>

                    <!-- Password -->
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-bold text-gray-700 mb-1.5">Password <span class="text-rose-400">*</span></label>
                        <div class="flex">
                            <vee-field :type="showPassword ? 'text' : 'password'" name="password" id="password" v-model="formData.password" class="block w-full p-2.5 rounded-l-md border border-gray-200 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="********" required />
                            <div class="py-2 px-3 rounded-r-md flex items-center justify-center border-t border-r border-b border-gray-200 cursor-pointer" @click="togglePassword">
                                <span class="text-gray-600 font-medium"><font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" /></span>
                            </div>
                        </div>
                        <ErrorMessage name="password" class="text-xs text-rose-500 font-semibold my-2" />
                    </div>

                    <!-- Login Option -->
                    <div class="flex items-center justify-between gap-4 mb-6">
                        <div class="flex items-center">
                            <input id="remember" type="checkbox" class="w-4 h-4 text-white bg-gray-100 accent-mainColor border-gray-300 rounded focus:outline-0 focus:ring-2 focus:ring-mainColor" />
                            <label for="remember" class="ml-2 text-sm text-gray-700 font-medium cursor-pointer">Remember Me?</label>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="bg-mainColor text-white block w-full border-0 py-1 px-4 text-lg font-semibold font-outfit rounded-md">Login</button>
                </vee-form>
            </div>
        </div>
    </section>
</template>