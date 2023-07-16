import React, {useState} from "react";
import {Document, Page} from "react-pdf";

export default function PDFViewer({ pdfFile }) {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    const goToPrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);

        const watermarkText = localStorage.getItem('username');

        // Add watermark to each page after the document is loaded
        const canvasList = document.querySelectorAll('.react-pdf__Page canvas');
        canvasList.forEach((canvas) => {
            const ctx = canvas.getContext('2d');
            ctx.font = '48px Arial';
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillText(watermarkText, 100, 100); // Adjust position as needed
        });
    };


    return (
        <div>
            <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={currentPage} />
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
        </div>
    );
}

