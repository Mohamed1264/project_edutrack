import { Select } from '../../Components/form/Select';

import {PasswordField , TextField} from '../../Components/form/Inputs'
import {Form ,FormContainer} from '../../Components/form/GlobalComponents'

import { ClipboardList, User,Mail } from "lucide-react";
import { useForm , usePage} from '@inertiajs/react'

export default function Login(){
    
    const { csrf } = usePage().props
    const theme= usePage().props.theme
    console.log(theme);
    
    const { data, setData, post, processing, errors, reset,clearErrors } = useForm({
        user_name: '',
        password: '',
      
      })
      const handleSubmit = (e) => {
        console.log(data)
        e.preventDefault()
    
        post('/login',{
             onSuccess: () => {
            // handle successful login
            reset('password')
          },
          onError: (errors) => {
            console.log('Login errors:', errors)
          }})
      }
      
      const handleChange =(name,value)=>setData(name,value);
      const handleFocus = (name)=> clearErrors(name , 'credentials')
    
   
    return (
        <div className={`w-full flex justify-center items-center min-h-screen !${theme} `}>
            <div className="  w-1/2">
                <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-50 mb-10">
                    <ClipboardList size={32}/>
                    <h2 className="text-2xl font-bold">EduTrack</h2>
                </div>
                {
                    errors.credentials ?
                    <div className=' bg-red-100 text-red-700 mb-2 w-full px-3 py-2 border rounded-md border-red-700 mx-auto md:max-w-sm'>
                        {errors.credentials}
                    </div>
                    :
                    ''
                }
                <Form
                submitBtnIsDisabled={processing}
                submitBtnTitle={'Login'}
                submitFunction={handleSubmit}
                >
                    <input type="hidden" name="_token" value={csrf} />
                    <FormContainer title={'Login to your Account'} icon={User} >
                         <TextField 
                            error={errors.user_name}
                            name={'user_name'}
                            label={'User Name'}
                            value={data.user_name}
                            handleChange={handleChange}
                            handleFocus={handleFocus}
                            placeHolder={"User's user name"}
                            icon={User}
                    
                        />
                        <PasswordField 
                            error={errors.password}
                            name={'password'}
                            label={'Password'}
                            value={data.password}
                            handleChange={handleChange}
                            handleFocus={handleFocus}
                            placeHolder={"Enter users's password"}
                        />  
                    </FormContainer>
                </Form>
            </div> 
        </div>
    )
}