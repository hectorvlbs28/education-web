import { Button } from '@mui/material';

type Props = {
  label: string;
  handleAction: () => void;
};

const TextButton = ({ label, handleAction }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAction();
  };

  return (
    <Button
      variant="text"
      onClick={handleClick}
      sx={{
        padding: 0,
      }}
    >
      {label}
    </Button>
  );
};

export default TextButton;
