// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Button, { ButtonProps } from '@mui/material/Button'
// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addCategory } from 'src/store/apps/category'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { addSubCategory } from 'src/store/apps/sub-category'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))


interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  sub_catname: string
  abbreavation: string
  description: string
  status: string
  image : string
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  sub_catname: yup.string().required(),
  abbreavation: yup.string().required(),
  description: yup.string().required(),
  status: yup.string(),
  // featured_image : yup.string().required()
})

const defaultValues = {
  sub_catname: '',
  abbreavation: '',
  description: '',
  status: '',
  image : ''
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState<string>('basic')
  const [status, setStaus] = useState<string>('1')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [inputValue, setInputValue] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: UserData) => {
    debugger;
    console.log("OnSubmit of Users",data);
    data.status = status;
    data.image = imgSrc;
    dispatch(addSubCategory({...data}))
    toggle()
    reset()
  }

  const handleClose = () => {
    // setPlan('basic')
    // setRole('subscriber')
    // setValue('contact', Number(''))
    toggle()
    reset()
  }

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/avatars/1.png')
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Category</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='sub_catname'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Sub Category'
                  onChange={onChange}
                  placeholder='John Doe'
                  error={Boolean(errors.sub_catname)}
                />
              )}
            />
            {errors.sub_catname && <FormHelperText sx={{ color: 'error.main' }}>{errors.sub_catname.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='abbreavation'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Abbreavation'
                  onChange={onChange}
                  placeholder='johndoe'
                  error={Boolean(errors.abbreavation)}
                />
              )}
            />
            {errors.abbreavation && <FormHelperText sx={{ color: 'error.main' }}>{errors.abbreavation.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Description'
                  onChange={onChange}
                  placeholder='description'
                  error={Boolean(errors.description)}
                />
              )}
            />
            {errors.description && <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>}
          </FormControl>
          {/* <FormControl fullWidth sx={{ mb: 6 }}> */}
          <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                    Reset
                  </ResetButtonStyled>
                  <Typography sx={{ mt: 5, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                </div>
          {/* </FormControl> */}
      
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Status</InputLabel>
            <Select
              fullWidth
              value={status}
              id='select-role'
              label='Select Role'
              labelId='role-select'
              onChange={e => setStaus(e.target.value)}
              inputProps={{ placeholder: 'Select Status' }}
            >
              <MenuItem value='1'>Active</MenuItem>
              <MenuItem value='2'>InActive</MenuItem>
             
            </Select>
          </FormControl>
     
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
