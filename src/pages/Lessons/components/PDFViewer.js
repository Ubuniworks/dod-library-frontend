import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function PDFViewer({ url }) {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Grid item xs={12}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
        >
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {/*{Array.from(new Array(numPages), (el, index) => (*/}
                    <Page
                        pageNumber={currentPage}
                    />
                {/*))}*/}
            </Document>
            <p>
                Page {currentPage} of {numPages}
            </p>
            <button disabled={currentPage <= 1} onClick={goToPrevPage}>
                Previous
            </button>
            <button disabled={currentPage >= numPages} onClick={goToNextPage}>
                Next
            </button>
        </Grid>
    );
}

export default PDFViewer;
