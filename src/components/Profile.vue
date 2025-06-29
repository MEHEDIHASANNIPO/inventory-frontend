<script setup>
/** All Library Import */
import { ref, inject } from 'vue';
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

/** All Instance */
const swal = inject('$swal');
const loginStore = useLoginStore();
const router = useRouter();

/** All Variables */
const profiles = inject('profileview');
const navValue = inject('navbar');
const notification = inject('notificationview');
const userName = loginStore.getUsername || 'User';

/** All Methods */
const showProfile = () => {
    profiles.value = !profiles.value;
    navValue.value = false
    notification.value = false
}

const logout = () => {
    loginStore.removeToken();
    loginStore.removeUsername();

    swal({
        icon: 'success',
        timer: 1000,
        title: 'Logout Successfull!'
    });

    router.push({ name: 'login' })
}

</script>
<template>
    <!-- Profile -->
    <div class="flex items-center gap-2 cursor-pointer relative" @click="showProfile">
        <div class="w-9 h-9 rounded-full">
            <img class="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700" src="@/assets/img/widgets/profile.jpg" alt="User profile" />
        </div>
        <div class="hidden lg:block text-sm text-gray-700">
            <p><span class="font-medium">Welcome!</span> <span class="font-semibold">{{ userName }}</span></p>
        </div>
        <div class="absolute top-[110%] right-0 w-52 py-2 px-4 origin-top bg-white shadow rounded-md z-10 transition ease-in duration-300" :class="!profiles ? 'scale-0 opacity-0 invisible' : ''">
            <ul>
                <li class="py-1.5 text-sm font-medium text-gray-700"><router-link>Profile Setting</router-link></li>
                <li class="py-1.5 text-sm font-medium text-gray-700"><router-link>Change Password</router-link></li>
                <li class="py-1.5 text-sm font-medium text-gray-700 border-t border-gray-200"><a href="javascript:void(0)" @click.prevent="logout">Logout</a></li>
            </ul>
        </div>
    </div>
    <!-- Profile -->
</template>