export async function initiatePages(pdfFile, callback) {
    const numberOfPages = await pdfToImages(pdfFile, callback)
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
    if (numberOfPages && numberOfPages % 2) {
        const pagesElem = document.getElementById('pages');
        var pageElem = document.createElement('div');
        pageElem.classList.add('page');
        pagesElem.appendChild(pageElem);
    }

    return numberOfPages
}

export async function pdfToImages (pdfFile, callback) {
    const file = pdfFile
    const fileReader = new FileReader();
    const pages = document.getElementById('pages');
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const ratio = (vw / 1440) * 0.8

    let uploadProgress = 0

    return new Promise((resolve, reject) => {
        try {
            fileReader.onload = () => {
                const arrayBuffer = fileReader.result;
                pdfjsLib.getDocument(arrayBuffer).promise.then((pdf) => {
                    // callback()
                    // this.totalPageNumber = pdf.numPages
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
                                uploadProgress = Math.round((pageNumber / pdf.numPages) * 100)
                                if (pageNumber == pdf.numPages) {
                                    resolve(pdf.numPages)
                                }
                                callback(uploadProgress)
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
}