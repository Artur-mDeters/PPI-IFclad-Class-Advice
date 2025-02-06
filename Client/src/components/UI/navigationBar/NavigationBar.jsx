import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '0' }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
      >
        Voltar
      </Button>
    </Box>
  );
};

export default NavigationBar;