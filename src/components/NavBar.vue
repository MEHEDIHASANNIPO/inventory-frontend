<script setup>
/** All Library Import */
import { ref, inject } from 'vue';

/** All Variables */
const activeMenu = ref(null)
const navValue = inject('navbar')

/** All Methods */
const toggleMenu = (menuName) => {
  activeMenu.value = activeMenu.value === menuName ? null : menuName
}
</script>

<template>
    <!-- Navbar Start -->
    <div class="min-w-72 min-h-screen h-full origin-left fixed top-0 lg:translate-x-0 left-0 z-10 bg-white shadow-lg text-gray-50 py-8 px-9 transition-all ease-in-out duration-500 overflow-y-auto" :class="!navValue ? '-translate-x-[150%]' : ''">
        <span class="block lg:hidden absolute top-5 right-5 cursor-pointer text-mainColor" @click="navValue = false"><font-awesome-icon :icon="['fas', 'circle-xmark']" class="text-lg text-mainColor" /></span>
        <h2 class="text-center text-mainColor text-2xl font-bold">MHN <font-awesome-icon :icon="['fas', 'bolt']" class="text-lightColor text-3xl" /> Panel</h2>

        <!-- Dashboard -->
        <router-link @click="navValue = false" :to="{name: 'dashboard'}" class="py-2.5 px-4 rounded-lg bg-gray-100 mt-12 text-sm font-medium text-gray-700 flex items-center gap-3"><font-awesome-icon :icon="['fas', 'house']" /> Dashboard</router-link>
        <h4 class="text-sm font-semibold font-outfit mt-8 mb-6 text-gray-500">System Setting</h4>

        <ul class="space-y-6" id="mhnNav">

            <!-- General Setting -->
            <li>
                <router-link @click="navValue = false" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'gear']" /> General Setting</span>
                </router-link>
            </li>

            <!-- POS -->
            <li>
                <router-link @click="navValue = false" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'shopping-cart']" /> POS</span>
                </router-link>
            </li>

            <!-- Category Management -->
            <li @click="toggleMenu('menu1')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'folder-open']" /> Category Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu1'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- Brand Management -->
            <li @click="toggleMenu('menu2')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'tag']" /> Brand Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu2'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- WareHouse Management -->
            <li @click="toggleMenu('menu3')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'warehouse']" /> WareHouse Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu3'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- Supplier Management -->
            <li @click="toggleMenu('menu4')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'truck-field']" /> Supplier Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu4'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- Product Management -->
            <li @click="toggleMenu('menu5')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'cart-shopping']" /> Product Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu5'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- Expense Management -->
            <li @click="toggleMenu('menu6')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'sack-dollar']" /> Expense Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu6'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- Sales History -->
            <li>
                <router-link @click="navValue = false" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'square-poll-vertical']" /> Sales History</span>
                </router-link>
            </li>

            <!-- Employee Management -->
            <li @click="toggleMenu('menu7')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'user-tie']" /> Employee Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu7'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- Salary Management -->
            <li @click="toggleMenu('menu8')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'dollar-sign']" /> Salary Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu8'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- Customer Management -->
            <li @click="toggleMenu('menu9')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'users']" /> Customer Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu9'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>

            <!-- Transfer Management -->
            <li @click="toggleMenu('menu10')">
                <a href="javascript:void(0)" class="text-sm font-medium text-gray-700 flex items-center justify-between gap-3 hover:text-mainColor">
                    <span class="flex items-center gap-3"><font-awesome-icon :icon="['fas', 'shuffle']" /> Transfer Management</span> <font-awesome-icon :icon="['fas', 'chevron-right']" class="transition duration-300 text-xs" />
                </a>
                <transition name="slide">
                
                    <ul v-show="activeMenu === 'menu10'" class="overflow-hidden py-1.5 my-3 space-y-4 list-disc ps-8 transition-all ease-in-out duration-500 marker:text-mainColor">
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">All List</router-link></li>
                        <li><router-link @click="navValue = false" class="text-sm font-medium text-gray-700 hover:text-mainColor">Create New</router-link></li>
                    </ul>   
                </transition>
            </li>
        </ul>
    </div>
    <!-- Navbar End -->
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 1000px;
  opacity: 1;
}

</style>