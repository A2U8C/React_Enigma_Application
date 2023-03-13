import { Box, CssBaseline, Typography } from "@mui/material";
import CohortsList from "../components/CohortsList";

function CohortsPage() {
  return (
    <Box
      id="drawer__container"
      sx={{
        position: "relative",
        display: "flex",
        minHeight: "95%",
      }}
    >
      <CssBaseline />
      <CohortsList />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          totam quibusdam dolore, maxime placeat minima deserunt id quia dolorum
          beatae est ducimus. Esse modi amet ullam obcaecati nisi, veniam quos.
          Eius, quia, sapiente eum voluptate officiis unde tempora similique
          repellendus molestias repudiandae sit numquam. Libero cumque quos
          nihil ea ipsam officia saepe commodi veniam, corporis omnis culpa,
          unde iste cum! Perspiciatis laborum omnis eum velit eos nulla a
          nostrum fuga saepe fugiat nisi animi mollitia corrupti perferendis,
          veniam, eius vero? Obcaecati eos quam quod optio, ducimus iure illo
          quia asperiores? Autem totam sint vitae. Voluptatem perferendis
          deserunt asperiores aliquam iure! Quidem beatae iste quisquam numquam
          molestiae nesciunt quae maiores magnam, nostrum iusto dolores, neque
          sint, consequatur ab asperiores odio eaque. Expedita aspernatur
          ratione, ea quis ut odio quibusdam officiis sequi, minima molestias
          rerum facilis esse. Nostrum eos eligendi ratione, libero ipsam culpa
          nobis dolorem tempore iure suscipit vitae magni nisi.
        </Typography>
      </Box>
    </Box>
  );
}

export default CohortsPage;
