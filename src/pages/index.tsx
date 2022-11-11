import { styled } from "../styles";

const Button = styled("button", {
  backgroundColor: "$green300",
  borderRadius: 4,
  border: 0,
  padding: "4px 8px",
  transition: "all 0.2s",
  cursor: "pointer",

  "&:hover": {
    filter: "brightness(0.8)",
  },
});

export default function Home() {
  return (
    <div>
      <Button>Elias Alexandre</Button>
    </div>
  );
}
