import React, { useState } from 'react';
import { Button, FormControl, IconButton, Snackbar, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyToClipboardComponent: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard:', text);
        setSnackbarOpen(true); // Show snackbar when text is successfully copied
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  };

  const handleLinkClick = (textToCopy: string) => {
    copyTextToClipboard(textToCopy);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Tooltip title="Copy link">
        <Button onClick={() => handleLinkClick('Tutor-mhsyuge086538')}>
            <Typography sx={{color:"darkblue"}}> Tutor-mhsyuge086538</Typography>
          
        </Button>
      </Tooltip>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard"
      />
    </div>
  );
};

export default CopyToClipboardComponent;
