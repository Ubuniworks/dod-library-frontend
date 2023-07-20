import React, {useEffect, useState} from 'react';
import {pdfjs} from 'react-pdf';
import FileViewer from "./components/FileViewer";
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


    const getCurrentUsername = () => {
        // Implement your logic to get the current username
        // You can use the authenticated user data stored in your application's state or context
        return localStorage.getItem('username');
    };
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
                    <FileViewer url={bookData.pdf_file_url}/>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}
