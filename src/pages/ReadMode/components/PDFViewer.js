import React, {useState} from "react";
import {Document, Page} from "react-pdf";

export default function PDFViewer({ pdfFile }) {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
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

