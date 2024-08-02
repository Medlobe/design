import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const dotAnimation = keyframes`
  0% { content: ''; }
  33% { content: '.'; }
  67% { content: '..'; }
  100% { content: '...'; }
`;

export default function DotLoading() {
  <Box
    component="span"
    sx={{
      display: "inline-block",
      animation: `${dotAnimation} 1s infinite`,
    }}
  >
    ...
  </Box>;
}
