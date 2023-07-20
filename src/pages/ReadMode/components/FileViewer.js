import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function FileViewer({url}) {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        setCurrentPage(1); // Reset the current page when the URL prop changes
    }, [url]);

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    const watermarkText = localStorage.getItem('username');
    const watermarkOpacity = 0.15;
    const transform = `rotate(${Math.floor(Math.random() * 91) - 45}deg) translate(${Math.floor(Math.random() * 101) - 50}%, ${Math.floor(Math.random() * 101) - 50}%)`;




    if (url && url !== '') {
        const fileType = getFileType(url);

        if (fileType === 'application/pdf') {
            return (
                <Grid item xs={12}>
                    <div
                        style={{
                            maxWidth: '800px',
                            position: 'relative',
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}>
                        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={currentPage} />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pointerEvents: 'none',
                                }}
                            >
                                {[...Array(7)].map((_, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            opacity: watermarkOpacity,
                                            color: 'black',
                                            fontSize: '90px',
                                            transform,
                                        }}
                                    >
                                        {watermarkText}
                                    </div>
                                ))}
                            </div>
                        </Document>
                    </div>
                    <Typography>
                        Page {currentPage} of {numPages}
                    </Typography>
                    <Button disabled={currentPage <= 1} onClick={goToPrevPage}>
                        Previous
                    </Button>
                    <Button disabled={currentPage >= numPages} onClick={goToNextPage}>
                        Next
                    </Button>
                </Grid>
            );
        } else if (fileType === 'application/epub+zip') {
            return (
                <Grid item xs={12}>
                    <Typography>File type not yet supported</Typography>
                </Grid>
            );
        } else if (fileType.startsWith('image/')) {
            return (
                <Grid item xs={12}>
                    <img src={url} alt={"Image"}/>
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12}>
                    <Typography>Unsupported file format</Typography>
                </Grid>
            );
        }
    } else {
        return (
            <Grid item xs={12}>
                <Typography>No file selected</Typography>
            </Grid>
        );
    }
}

function getFileType(url) {
    const parsedUrl = new URL(url);
    const fileUrl = parsedUrl.origin + parsedUrl.pathname;
    const extension = fileUrl.split('.').pop().toLowerCase();
    const fileTypeMap = {
        pdf: 'application/pdf',
        epub: 'application/epub+zip',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        // Add more file extensions and their corresponding MIME types as needed
    };


    return fileTypeMap[extension] || '';
}

export default FileViewer;
