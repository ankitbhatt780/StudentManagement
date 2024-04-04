import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import React from "react";

export const Cards = () => {
  return (
    <Box width="100%">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "3vh",
          //   backgroundColor: "lightblue",
          padding: "5px ",
          marginTop: "20px",
        }}
      >
        <Card>
          <CardMedia
            component="img"
            height="140"
            image="https://media.istockphoto.com/id/1000887536/photo/back-view-of-elementary-students-raising-their-arms-on-a-class.jpg?s=612x612&w=0&k=20&c=i0PBNmY4nSgOhHyy9AU5OAiJrOsHk7f7jLcNkO6CApE= "
            alt="unsplash image"
          />
          <CardContent>
            <CardContent>
              <h2> About as</h2>
            </CardContent>
            <Typography gutterBottom variant="h5" component="div"></Typography>
            <Typography variant="body2" color="text.secondary">
              My school essay in English this video is about. This essay
              describe your school
            </Typography>
          </CardContent>

          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Larn More</Button>
          </CardActions>
        </Card>

        <Card>
          <CardMedia
            component="img"
            height="140"
            image="https://www.nicepng.com/png/full/258-2583957_contact-us-contact-us-hero.png"
            alt="unsplash image"
          />
          <CardContent>
            <CardContent>
              <h2> Contact as</h2>
            </CardContent>
            <Typography gutterBottom variant="h5" component="div"></Typography>
            <Typography variant="body2" color="text.secondary">
              <h3> ➣ 7987723186</h3>
              <h3> ➣ sachinsingh020406@gmail.com</h3>
              My school essay in English this video is about. This essay
              describe your school
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Larn More</Button>
          </CardActions>
        </Card>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image="https://www.indoretalk.com/wp-content/uploads/2018/08/a-google-map-showing-the-location-of-indore-city-madhya-pradesh.jpg"
            alt="unsplash image"
          />
          <CardContent>
            <CardContent>
              <h2> Location</h2>
            </CardContent>
            <Typography gutterBottom variant="h5" component="div"></Typography>
            <Typography variant="body2" color="text.secondary">
              My school essay in English this video is about. This essay
              describe your school
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Larn More</Button>
          </CardActions>
        </Card>
      </div>
    </Box>
  );
};
