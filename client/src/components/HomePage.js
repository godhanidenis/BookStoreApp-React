import React, { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Button, FormControl, FormGroup, Grid, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const HomePage = () => {
  const [booksList, setBooksList] = useState([]);
  const [createBook, setCreateBook] = useState({
    title: "",
    author: "",
  });
  const { title, author } = createBook;

  const getAllBooks = async () => {
    const response = await axios.get("/allBooks");
    if (response.status === 200) {
      setBooksList(response.data);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const onValueChange = (e) => {
    setCreateBook({ ...createBook, [e.target.name]: e.target.value });
  };

  const addBook = async (data) => {
    const response = await axios.post("/createBook", data);
    if (response.status === 200) {
      getAllBooks();
    }
  };

  const createNewBook = async () => {
    if (!title || !author) {
      alert("plz fill all Valid field!!");
    } else {
      addBook(createBook);
    }
  };

  const deleteBook = async (id) => {
    const response = await axios.delete(`/book/${id}`);
    if (response.status === 200) {
      getAllBooks();
    }
  };

  return (
    <>
      <Box sx={{ position: "sticky", top: 0, zIndex: 0 }}>
        <AppBar position="static" sx={{ background: "#4643d3" }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              My Reading List
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ padding: "20px", maxHeight: "60vh", overflow: "auto" }}>
        {booksList.map((user) => (
          <Grid
            container
            key={user.id}
            sx={{
              background: "#faefe3",
              marginBottom: "20px",
              padding: "25px",
              borderRadius: "12px",
            }}
          >
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="space-between"
              sx={{ marginBottom: "10px" }}
            >
              <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                {user.title}
              </span>
              <CloseIcon
                onClick={() => deleteBook(user.id)}
                sx={{ cursor: "pointer" }}
              />
            </Grid>
            <Grid item xs={12}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#fd9474",
                }}
              >
                {user.author}
              </span>
            </Grid>
          </Grid>
        ))}
      </Box>

      <Box sx={{ padding: "20px" }}>
        <FormGroup>
          <FormControl>
            <TextField
              id="title"
              variant="outlined"
              onChange={(e) => onValueChange(e)}
              name="title"
              value={title}
              type="text"
              placeholder="Book Title"
              required
              sx={{ marginBottom: "10px" }}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="author"
              variant="outlined"
              onChange={(e) => onValueChange(e)}
              name="author"
              value={author}
              type="text"
              placeholder="Author"
              required
              sx={{ marginBottom: "10px" }}
            />
          </FormControl>

          <FormControl>
            <Button
              variant="contained"
              onClick={() => createNewBook()}
              style={{
                marginTop: 10,
                width: "100px",
                background: "#fe805c",
                borderRadius: "25px",
              }}
            >
              Create
            </Button>
          </FormControl>
        </FormGroup>
      </Box>
    </>
  );
};

export default HomePage;
