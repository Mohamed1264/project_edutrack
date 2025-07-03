import { PasswordField } from "../../Components/form/Inputs"
import { Form, FormContainer } from "../../Components/form/GlobalComponents"
import useForm from "../../utils/Hooks/useForm"
import { Lock } from "lucide-react"

export default function ChangePassword({ password }) {
  const initialValues = {
    oldPassword: password || '',
    newPassword: '',
    confirmPassword: '',
  }

  const validation = {
    oldPassword: {
      message: 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols',
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/,
    },
    newPassword: {
      message: 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols',
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/,
    },
    confirmPassword: {
      message: 'The passwords do not match. Please make sure both password fields are identical.',
      check: 'newPassword',
    },
  }

  const { errors, values, handleChange, handleFocus, handleSubmit, isSubmitDisabled } = useForm( initialValues , validation, 'add')
  console.log(validation);
  
  console.log(values);
  return (
    <Form
      submitBtnIsDisabled={isSubmitDisabled()}
      submitBtnTitle={'Change Password'}
      submitFunction={handleSubmit}
      maxWidth="md:max-w-3xl"
    >
      <FormContainer icon={Lock} title={'Manage your Password'}>
        <PasswordField
          error={errors.oldPassword}
          name={'oldPassword'}
          label={'Old Password'}
          value={values.oldPassword}
          handleChange={handleChange}
          handleFocus={handleFocus}
          placeHolder={"Enter your old password"}
        />
        <PasswordField
          error={errors.newPassword}
          name={'newPassword'}
          label={'New Password'}
          value={values.newPassword}
          handleChange={handleChange}
          handleFocus={handleFocus}
          placeHolder={"Enter your new password"}
        />
        <PasswordField
          error={errors.confirmPassword}
          name={'confirmPassword'}
          label={'Confirm Password '}
          value={values.confirmPassword}
          handleChange={handleChange}
          handleFocus={handleFocus}
          placeHolder={"Confirm your new password"}
        />
      </FormContainer>
    </Form>
  )
}
