import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PDFViewer from "./components/PDFViewer";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function ReadMode() {
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        // Retrieve the stored book data from localStorage or sessionStorage
        const storedBook = localStorage.getItem('book');
        const parsedBookData = storedBook ? JSON.parse(storedBook) : null;

        // Set the bookData state
        setBookData(parsedBookData);

        // Clear the stored data if needed
        // localStorage.removeItem('book');
    }, []);

    return (
        <div>
            {bookData ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                        }}>
                    <h1>{bookData.title}</h1>
                    <PDFViewer pdfFile={bookData.pdf_file} />
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}
