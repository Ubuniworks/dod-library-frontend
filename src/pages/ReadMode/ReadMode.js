import React, {useEffect, useState} from 'react';
import {pdfjs} from 'react-pdf';
import PDFViewer from "./components/PDFViewer";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Api from "../../api/api";
import {Button} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function ReadMode() {
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        // Retrieve the stored book data from localStorage or sessionStorage
        const storedBook = localStorage.getItem('book');
        const parsedBookData = storedBook ? JSON.parse(storedBook) : null;

        // Set the bookData state
        setBookData(parsedBookData);

    }, []);

    function markFavorite() {

        // Set the bookData state
        // bookData.id
        let data = {
            "id": bookData.id,
        }
        Api.put('library/books/mark_favourite/', data).then((response) => {
                console.log(response.data);
                // setBookData(response.data);
            }
        ).catch((error) => {
                console.log(error);
            }
        );
    }


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
                    <Button
                        variant="contained"
                        startIcon={<FavoriteIcon/>}
                        onClick={markFavorite}
                    >
                        Favourite
                    </Button>
                    <h1>{bookData.title}</h1>
                    <PDFViewer pdfFile={bookData.pdf_file}/>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}
