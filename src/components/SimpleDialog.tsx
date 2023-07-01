import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

interface SimpleDialogProps {
  message: string;
  handleCancelClick: () => void;
  handleOkayClick: () => void;
  show?: boolean;
}

const SimpleDialog = ({
  message,
  handleCancelClick,
  handleOkayClick,
  show = false,
}: SimpleDialogProps) => {
  return (
    <Dialog open={show}>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button onClick={handleOkayClick}>Okay</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
