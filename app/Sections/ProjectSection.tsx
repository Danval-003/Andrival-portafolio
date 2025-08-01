"use client";
import CardCarousel3D from "@/components/Carrousel3D";
import { ProjectCard, ProjectCardProps } from "@/components/Card";
import { useEffect, useState } from "react";

const ProjectsSection: React.FC = () => {
  // Use window to get the width and height of the viewport
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isGithubActions = process.env.GITHUB_ACTIONS === "true";
  const repoName = "Andrival-portafolio";
  const basePath = isGithubActions ? `/${repoName}` : "";
  const placeholder = `${basePath}/assets/common/placeholder.png`;

  // Despues de que la ventana tenga cierto limite de tamaño, renderizamos 3, 2 o 1 carta
  const visibleCount = size.width > 1200 ? 3 : size.width > 800 ? 2 : 1;

  return (
    <div style={{ marginTop: "2rem", width: "100%" }}>
      <CardCarousel3D<ProjectCardProps>
        data={[
          {
            title: "Project 1",
            description: "Description for project 1",
            link: "https://example.com/project1",
            image: placeholder, // Using the placeholder image
          },
          {
            title: "Project 2",
            description: "Description for project 2",
            link: "https://example.com/project2",
            image: placeholder, // Using the placeholder image
          },
          {
            title: "Project 3",
            description: "Description for project 3",
            link: "https://example.com/project3",
            image: placeholder, // Using the placeholder image
          },
          {
            title: "Project 4",
            description: "Description for project 4",
            link: "https://example.com/project4",
            image: placeholder, // Using the placeholder image
          },
          {
            title: "Project 5",
            description: "Description for project 5",
            link: "https://example.com/project5",
            image: placeholder, // Using the placeholder image
          },
          {
            title: "Project 6",
            description: "Description for project 6",
            link: "https://example.com/project6",
            image: placeholder, // Using the placeholder image
          },
        ]}
        RenderItem={ProjectCard}
        cardWidth={
          size.width *
          (visibleCount >= 3 ? 0.3 : visibleCount === 2 ? 0.35 : 0.75)
        }
        height={size.height * 0.5}
        autoPlayInterval={3000}
        spacingPercent={visibleCount >= 3 ? 30 : visibleCount === 2 ? 40 : 50}
        visibleCount={visibleCount}
      />
    </div>
  );
};

export default ProjectsSection;
