// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useDispatch, useSelector } from 'react-redux'
import { deleteUser} from 'src/store/apps/user'
import { deleteSubCategory } from 'src/store/apps/sub-category'
import { deleteCategory } from 'src/store/apps/category'
import { deleteProduct } from 'src/store/apps/products'


// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  deleteData: string | number
  pageName: string
}

const UserSuspendDialog = (props: Props) => {
  // ** Props
  const { open, setOpen } = props
  console.log("Suspend dialogue",props.pageName)
  // ** States
  const [userInput, setUserInput] = useState<string>('yes')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const handleConfirmation = (value: string) => {
    if(props.pageName === "User"){
      handleDelete();
    }
    if(props.pageName === "Category"){
      handleDeleteCategory();
    }
    if(props.pageName === "SubCategory"){
      handleDeleteSubCategory();
    }
    if(props.pageName === "Product"){
      handleDeleteProduct();
    }
    
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleDelete = () => {
    dispatch(deleteUser(props.deleteData))
  }

  const handleDeleteSubCategory = () => {
    dispatch(deleteSubCategory(props.deleteData))
  }
  const handleDeleteCategory = () => {
    dispatch(deleteCategory(props.deleteData))
  }

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(props.deleteData))
  }


  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, maxWidth: '85%', textAlign: 'center', '& svg': { mb: 12.25, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Are you sure?
              </Typography>
            </Box>
            {props.pageName === "User" && <Typography>You won't be able to revert User details!</Typography>}
            {props.pageName === "Category" && <Typography>You won't be able to revert category details!</Typography>}
            {props.pageName === "SubCategory" && <Typography>You won't be able to revert Sub Category details!</Typography>}
            {props.pageName === "Product" && <Typography>You won't be able to revert Product details!</Typography>}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => handleConfirmation('yes')}>
            Yes, Delete!
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={userInput === 'yes' ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
            />
            <Typography variant='h4' sx={{ mb: 8 }}>
              {userInput === 'yes' ? 'Deleted!' : 'Cancelled'}
            </Typography>
            <Typography>{userInput === 'yes' ? 'Deleted Successfully.' : 'Cancelled Deletion :)'}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserSuspendDialog
