
import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

class ReleaseNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <span onClick={this.handleOpen} style={{ color: '#00C2CB', fontWeight: 'bold', cursor: "pointer" }}>Version 3.1.4</span>
        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              aria-label="close"
              onClick={this.handleClose}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Version
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ul>
                <li>Version 1.0</li>
                <li>Version 2.0</li>
                <li>Version 3.0</li>
                {/* Add more versions as needed */}
              </ul>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default ReleaseNotes;
