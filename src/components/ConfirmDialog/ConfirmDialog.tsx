// ConfirmDialog.jsx
// material ui
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

const ConfirmDialog = ({
  isOpen,
  setIsOpen,
  deleteLessonVideo,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  deleteLessonVideo: () => void;
}) => {
  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm the action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton>
          <Close
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>some message here</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button onClick={()=>{
            deleteLessonVideo();
            setIsOpen(false);
        }} color="secondary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
