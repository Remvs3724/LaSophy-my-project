import React from "react";
import { Card} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
const { Meta } = Card; 
const DashboardContent = () => {
const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/books`) // Fetch book data from backend
        .then(response => {
         setBooks(response.data)})
        .catch(error => console.error("Error fetching books:", error));
}, []);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", padding: "1rem" }}>
            {books.map(book => (
                <Card
                    key={book.bookId}
                    hoverable
                    style={{ width: "240px" }}
                    cover={
                        <img 
                            alt={book.title} 
                            src={`https://storage.googleapis.com/lasophy-4e0ff.firebasestorage.app/imgCover/${book.img_path}`}
                            style={{ height: "340px", objectFit: "cover" }} 
                        />
                    }
                    onClick={() => navigate(`/PDFreader/${book.pdf_path}`)}
                >
                    <Meta 
                    title={ book.title} 
                    description={`${book.author} (${book.year})`} />
                </Card>
            ))}
        </div>
  );
};

export default DashboardContent;