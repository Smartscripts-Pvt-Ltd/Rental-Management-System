// ** React Imports
import { useState, useEffect, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button, {ButtonProps}from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'


// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addProduct } from 'src/store/apps/products'

// ** Types Imports

import { RootState, AppDispatch } from 'src/store'

import { fetchDataActiveSubCategory } from 'src/store/apps/sub-category'
import { fetchDataActiveCategory } from 'src/store/apps/category'



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

interface ProductData {
  name: string
  category: string
  sub_category: string
  specification: string
  description: string
  image: string
  status: string
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
  name: yup.string().required(),
  category: yup.string(),
  sub_category: yup.string(),
  specification: yup.string().required(),
  description: yup.string().required()
})

const defaultValues = {
  name: '',
  category: '',
  sub_category: '',
  specification: '',
  description: '',
  image: '',
  status: ''
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState<string>('basic')
  const [role, setRole] = useState<string>('subscriber')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [inputValue, setInputValue] = useState<string>('')
  const [imgSrc2, setImgSrc2] = useState<string>('/images/avatars/2.png')
  const [inputValue2, setInputValue2] = useState<string>('')
  const [status, setStaus] = useState<string>('1')
  const [category, setCategory] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const storeSubCategory = useSelector((state: RootState) => state.subCategory.allData)
  const storeCategory = useSelector((state: RootState) => state.category.allData)
  console.log("************store data is",storeSubCategory);
  console.log("storeCategory",storeCategory)
  useEffect(() => {
    debugger;
    dispatch(
      fetchDataActiveSubCategory() 
    )
    dispatch(fetchDataActiveCategory())
  }, [dispatch])
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

  const onSubmit = (data: ProductData) => {
    console.log("OnSubmit of Users",data);
    data.category = category;
    data.sub_category  = subCategory;
    data.image = imgSrc;
    data.status = status;
    
    dispatch(addProduct({...data}))
    toggle()
    reset()
  }

  const handleClose = () => {
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

  const handleInputImageChange2 = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc2(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset2 = () => {
    setInputValue2('')
    setImgSrc2('/images/avatars/1.png')
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
        <Typography variant='h6'>Add Product</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Product Name'
                  onChange={onChange}
                  placeholder='John Doe'
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Select Category</InputLabel>
            <Select
              fullWidth
              value={category}
              id='select-role'
              label='Select Category'
              labelId='role-select'
              onChange={e => setCategory(e.target.value)}
              inputProps={{ placeholder: 'Select Category' }}
            >
             {storeCategory && storeCategory.map((item:any) => {
                return(
                  <MenuItem value={item.id}>{item.category_name}</MenuItem>
                )
              })}
             
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Select Sub Category</InputLabel>
            <Select
              fullWidth
              value={subCategory}
              id='select-category'
              label='Select Sub Category'
              labelId='category-select'
              onChange={e => setSubCategory(e.target.value)}
              inputProps={{ placeholder: 'Select Sub Category' }}
            >
              {storeSubCategory && storeSubCategory.map((item:any) => {
                return(
                  <MenuItem value={item.id}>{item.sub_catname}</MenuItem>
                )
              })}
             
              {/* <MenuItem value='1'>Author</MenuItem>
              <MenuItem value='2'>Editor</MenuItem>
              <MenuItem value='3'>Maintainer</MenuItem>
              <MenuItem value='4'>Subscriber</MenuItem> */}
            </Select>
          </FormControl>
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
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='specification'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Specification'
                  onChange={onChange}
                  placeholder='johndoe'
                  error={Boolean(errors.specification)}
                />
              )}
            />
            {errors.specification && <FormHelperText sx={{ color: 'error.main' }}>{errors.specification.message}</FormHelperText>}
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
                {/* <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue2}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange2}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset2}>
                    Reset
                  </ResetButtonStyled>
                  <Typography sx={{ mt: 5, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                </div> */}
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
