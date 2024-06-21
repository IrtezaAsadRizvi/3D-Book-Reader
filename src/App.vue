<template>
    <ElevatedCardLayout :opened="!!bookFile" @upload="openPicker" :progress="progress">
        <div v-show="bookFile" class="book-container">
            <div class="book" :class="{ 'show': bookLoaded }">
                <div id="pages" class="pages">

                </div>
            </div>
        </div>
        <label class="book-input" v-show="!bookFile">
            <input type="file" accept="application/pdf" name="file" id="FileInput" v-on:change="uploadFile">
            <i data-feather="book-open"></i>
        </label>
    </ElevatedCardLayout>
    <div class="loader" :class="{'hidden': progress === 0 || progress === 100}"><div class="progress" :style="{width: progress + '%'}"></div></div>
</template>

<script>
import ElevatedCardLayout from './ElevatedCardLayout.vue';
import { initiatePages, pdfToImages } from './bookHelper';
export default {
    data: () => ({
        bookFile: null,
        uploadProgress: 0,
        totalPageNumber: 0,
        bookLoaded: false,
        pageLoaded: 0,
        progress: 0
    }),
    computed: {
    },
    components: {
        ElevatedCardLayout
    },
    mounted() {
        setTimeout(() => {
            this.uploadUrl('/manga.pdf')
        }, 1000)
    },
    methods: {
        openPicker() {
            console.log('openPicker')
            document.getElementById('FileInput').click(); 
        },

        async displayFile() {
            await initiatePages(this.bookFile, (progress) => {
                this.progress = progress
            })
            this.bookLoaded = true
        },

        async uploadFile(event) {
            this.bookFile = event.target.files[0];
            await this.displayFile()
        },

        async uploadUrl(fileUrl) {
            try {
                const response = await fetch(fileUrl, {
                    method: 'GET',
                    mode: 'no-cors'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response);
                }

                // Get the content type and blob from the response
                const contentType = response.headers.get('content-type');
                const blob = await response.blob();

                // Create a File object from the blob
                const fileName = fileUrl.split('/').pop(); // Extract filename from URL
                this.bookFile = new File([blob], fileName, { type: contentType });
                await this.displayFile()

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
    }
}
</script>