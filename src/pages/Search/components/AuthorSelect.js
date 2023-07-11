import React, {useState} from 'react';
import {Button, MenuItem, TextField} from '@mui/material';
import AuthorBooksModal from "./AuthorBooks";
import Api from "../../../api/api";

const SearchBooks = ({authors}) => {
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [modalStatus, setModalStatus] = useState(false);
    const [books, setBooks] = useState([])

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
        // console.log(selectedAuthor)
    };

    function Getbooks(selectedAuthor) {
        Api.get("library/books/get_books_by_author/", {
            params: {
                author: selectedAuthor
            }
        }).then(
            response => {
                setBooks(response.data)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }


    return (
        <div>
            <TextField
                select
                label="Select Author"
                value={selectedAuthor}
                onChange={handleAuthorChange}
                fullWidth
                style={{marginBottom: '1rem'}}
            >
                {authors.map((author) => (
                    <MenuItem key={author} value={author}>
                        {author}
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="contained"
                    onClick={() => {
                        setModalStatus(true)
                        Getbooks(selectedAuthor)
                    }}
            >
                Search
            </Button>
            <AuthorBooksModal modalStatus={modalStatus} setModalStatus={setModalStatus} author={selectedAuthor}
                              books={books}/>
        </div>
    );
};

export default SearchBooks;
