import { Typography } from "@mui/material";

interface Props {
  text: string;
}

const Text1 = ({ text }: Props) => {
  return (
    <Typography sx={{ textAlign: "left", color: "text.secondary" }}>
      {text}
    </Typography>
  );
};

export default Text1;
