export const formValidate = () => {
  return (
    {
        required: {
            value: true,
            message: 'Campo obligatorio required'
        },
        patternEmail:
        {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email format'
        },
        minLength:{
            value: 6,
            message: 'Password must be at least 6 characters long'
        },
        validateTrim: {
            trim: (v) => v.trim() !== '' || 'Password cannot be empty',
            noSpaces: (v) => !/\s/.test(v) || 'Password cannot contain spaces'
        }, 
        validateEquals: (getValues) => ({
           equals: (v) => v === getValues('password') || 'The passwords do not match',
        }),
    }
  );
}
