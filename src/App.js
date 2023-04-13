import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function App() {
  const [cats, setCats] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const API_URL = 'https://api.unsplash.com/search/photos';
    const API_KEY = 'UaBtS32MaraJFJqcJMwDC7MqT2QEKnVgOV4e5q5Gc7s'; // Replace with your own API key
    const fetchData = async () => {
      const response = await fetch(
        `${API_URL}?query=cats&per_page=29&page=${currentPage}`,
        {
          headers: {
            Authorization: `Client-ID ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      setCats(data.results);
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const cardsPerPage = 6;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedCats = cats.slice(startIndex, endIndex);

  return (
    <div>
      <Stack spacing={2}>
        {displayedCats.map((cat) => (
          <Card key={cat.id} sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 0, paddingTop: '100%' }}
              image={cat.urls.regular}
              title={cat.alt_description}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cat.alt_description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
        <Pagination
          count={Math.ceil(cats.length / cardsPerPage)}
          color="secondary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
}
