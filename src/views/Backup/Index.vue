<script setup>
/** All Library Import */
import { inject, onMounted, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useBackupStore } from '@/stores/backup';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Backup List';
const backupStore = useBackupStore();
const router = useRouter();
const swal = inject('$swal')

backupStore.router = router;
backupStore.swal = swal;

/** All Variables */

/** All Methods */
const DownloadBackup = (name) => {
    backupStore.downloadBackup(name);
}
const DeleteBackup = (name) => {
    swal({
        title: `Do you want to delete this data: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if(result.isConfirmed) {
            backupStore.deleteBackup(name, (status) => {
                if(status == 'success') {
                    backupStore.getBackups()
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    backupStore.getBackups();
})
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ backupStore.getTotalCount }}</span></h2>
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Backups</h2>

            <a v-if="$can('create', 'Backup')" href="javascript:void(0)" @click.prevent="backupStore.storeBackup()" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create New
            </a>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto md:overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">#</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Created At</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Backup Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Size</th>
                        <th v-if="$can('edit', 'Backup')" class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Status</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="( backup, index ) in backupStore.backups" :key="index">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ backup.created_at }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ backup.file_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ backup.file_size }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <a v-if="$can('download', 'Backup')" href="javascript:void(0)" @click.prevent="DownloadBackup(backup.file_name)" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'download']" /></a >                             
                            <a v-if="$can('delete', 'Backup')" href="javascript:void(0)" @click.prevent="DeleteBackup(backup.file_name)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'trash']" /></a>                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
