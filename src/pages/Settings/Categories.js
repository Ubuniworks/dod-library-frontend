import * as React from "react";
import {useEffect} from "react";
import {Button, Chip, Grid, TextField, Typography} from "@mui/material";
import API from "../../api/api";
import FaceIcon from '@mui/icons-material/Face';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClassIcon from '@mui/icons-material/Class';

export default function Categories() {
    const [categories, setCategories] = React.useState([]);
    const [newCategory, setNewCategory] = React.useState('');
    useEffect(() => {
        API.get("/library/categories/", {})
            .then((response) => {
                setCategories(response.data["results"])
            })
    }, [])

    const handleCategoryChange = (event) => {
        setNewCategory(event.target.value);
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await API.delete(`/library/categories/${categoryId}/`);
            if (response.status === 204) {
                alert('Category deleted successfully');
            }
            // Handle any additional logic or state updates after successful deletion
        } catch (error) {
            console.error('Error deleting category:', error);
            // Handle error cases or display error messages
        }
    };

    const handleDelete = async (categoryId) => {
        const updatedCategories = categories.filter((category) => category.id !== categoryId);
        setCategories(updatedCategories);
        await deleteCategory(categoryId);
    };

    const handleSaveCategory = (event) => {
        event.preventDefault();
        API.post('/library/categories/', {name: newCategory})
            .then((response) => {
                if (response.status === 201) {
                    alert("Category added successfully")
                    const newCategoryObject = response.data;
                    setCategories([...categories, newCategoryObject]);
                    setNewCategory(''); // Clear the text field after saving
                }
            }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <Grid container spacing={2} justifyContent="center" style={{marginTop: "20px"}}>
            <Grid item container xs={6} direction="column" alignItems="center" spacing={1}>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <Grid key={category.id} item>
                            <Chip
                                variant="outlined"
                                color="info"
                                label={category.name}
                                deleteIcon={<DeleteForeverIcon/>}
                                onDelete={() => handleDelete(category.id)}
                                icon={<ClassIcon/>}
                                size="large"
                            />
                        </Grid>
                    ))
                ) : (
                    <div>
                        <Typography variant={"h4"}>
                            Add categories here
                        </Typography>
                    </div>
                )}
            </Grid>

            <Grid item container xs={6} direction="column" alignItems="center" spacing={1}>
                <Grid item>
                    <TextField
                        label="New Category"
                        value={newCategory}
                        onChange={handleCategoryChange}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSaveCategory}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
