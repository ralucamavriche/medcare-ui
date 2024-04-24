import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Spinner = () => {
    return (
        <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        }}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
            }}>
                <CircularProgress />
            </Box>
        </Box>
    );
};

export default Spinner;
