export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  colorScheme?: "light" | "dark" | "ghost";
}
