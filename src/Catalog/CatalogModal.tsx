import React from 'react'
import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import { dataType } from '.'

type Props = {
  open: boolean
  handleClose: () => void
  data: dataType | null
}

const CatalogModal = ({ open, handleClose, data }: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        <img src={data?.url} alt={data?.title} loading="lazy" />
      </Box>
    </Modal>
  )
}

export default CatalogModal
