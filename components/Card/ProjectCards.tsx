import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import Link from "next/link";
import Image from "next/image";
import { ProjectCardProps } from "./types";

const ProjectCard: React.FC<
  ProjectCardProps & { width: number; height: number }
> = ({ title, description, image, link, width, height }) => {
  const cardHeight = height * 0.8;

  return (
    <Box
      component={Card}
      sx={{
        position: "relative",
        width: { xs: "100%", sm: width },
        height: { xs: "auto", sm: cardHeight },
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.3)",
        transition:
          "transform 0.3s ease, backdrop-filter 0.3s ease, background-color 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
          backdropFilter: "none",
          bgcolor: "rgba(255,255,255,0.4)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={link}
        target="_blank"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          textDecoration: "none",
          p: 0,
        }}
      >
        {image && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 160, sm: cardHeight * 0.5 },
            }}
          >
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </Box>
        )}
        <CardContent sx={{ flexGrow: 1, pt: 2, px: { xs: 1, sm: 2 } }}>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* Floating link icon instead of button */}
      <IconButton
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(6px)",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.8)",
          },
        }}
      >
        <LaunchIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ProjectCard;
