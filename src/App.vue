<template>

    <ElevatedCardLayout :opened="!!bookFile">
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
    <!-- {{ uploadProgress }}
  {{ totalPageNumber }} -->

</template>

<script>
import ElevatedCardLayout from './ElevatedCardLayout.vue';
export default {
    data: () => ({
        bookFile: null,
        uploadProgress: 0,
        totalPageNumber: 0,
        bookLoaded: false
    }),
    computed: {
        showExtraPage() {
            return this.totalPageNumber && this.totalPageNumber % 2
        }
    },
    components: {
        ElevatedCardLayout
    },
    mounted() {
        setTimeout(() => {
            this.uploadUrl('https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf')
        }, 1000)
    },
    methods: {
        initiatePages() {
            let pages = document.getElementsByClassName('page');
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (i % 2 === 0) {
                    page.style.zIndex = (pages.length - i);
                }
            }
            for (var i = 0; i < pages.length; i++) {
                //Or var page = pages[i];
                pages[i].pageNum = i + 1;
                pages[i].onclick = function () {
                    if (this.pageNum % 2 === 0) {
                        this.classList.remove('flipped');
                        this.previousElementSibling.classList.remove('flipped');
                    }
                    else {
                        this.classList.add('flipped');
                        this.nextElementSibling.classList.add('flipped');
                    }
                }
            }
            if (this.showExtraPage) {
                const pagesElem = document.getElementById('pages');
                var pageElem = document.createElement('div');
                pageElem.classList.add('page');
                pagesElem.appendChild(pageElem);
            }
        },
        async pdfToImages(pdfFile) {
            const file = pdfFile
            const fileReader = new FileReader();
            const pages = document.getElementById('pages');
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            const ratio = (vw / 1440) * 0.8

            return new Promise((resolve, reject) => {
                try {
                    fileReader.onload = () => {
                        const arrayBuffer = fileReader.result;
                        pdfjsLib.getDocument(arrayBuffer).promise.then((pdf) => {
                            this.totalPageNumber = pdf.numPages
                            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {

                                pdf.getPage(pageNumber).then((page) => {
                                    var pageElem = document.createElement('div');
                                    pageElem.classList.add('page');
                                    pages.appendChild(pageElem);

                                    const pageWidth = pageElem.getBoundingClientRect().width
                                    const pageHeight = pageElem.getBoundingClientRect().height

                                    const viewport = page.getViewport({ scale: ratio });
                                    const canvas = document.createElement('canvas');
                                    const context = canvas.getContext('2d');

                                    canvas.width = pageWidth;
                                    canvas.height = pageHeight;

                                    const renderContext = {
                                        canvasContext: context,
                                        viewport: viewport
                                    };

                                    page.render(renderContext).promise.then(() => {
                                        const preview = document.createElement("div");
                                        pageElem.appendChild(preview);
                                        preview.appendChild(canvas);
                                        preview.classList.add('preview');
                                        this.uploadProgress = Math.round((pageNumber / pdf.numPages) * 100)
                                        if (pageNumber == pdf.numPages) {
                                            resolve()
                                        }
                                    }).catch((error) => {
                                        reject(error)
                                    });
                                }).catch((error) => {
                                    reject(error)
                                });
                            }
                        }).catch((error) => {
                            reject(error)
                        });
                    };

                    fileReader.readAsArrayBuffer(file);
                } catch (error) {
                    reject(error)
                }
            })
        },

        async displayFile() {
            await this.pdfToImages(this.bookFile)
            this.initiatePages()
            setTimeout(() => {
                this.bookLoaded = true
            }, 2000)
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