import { FormControl, TextInput, TextInputProps } from '@primer/react';

export interface IMyTextInputProps extends TextInputProps {
    register?: any,
    errors?: any,
    validateMessage?: string,
    name?: string,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    ref?: any
}
const MyTextInput = (props: IMyTextInputProps) => {
    const { register, errors } = props;




    return (
        <>
            {register && props.name &&
                <>
                    <TextInput
                        ref={props.ref}
                        {...register(props.name, {
                            required: {
                                value: props.required,
                                message: props.validateMessage ?? ""
                            },
                            minLength: {
                                value: props.minLength,
                                message: props.validateMessage ?? ""
                            },
                            maxLength: {
                                value: props.maxLength,
                                message: props.validateMessage ?? ""
                            },
                            pattern: {
                                value: props.pattern,
                                message: props.validateMessage ?? ""
                            }

                        })}
                        name={props.name}
                        {...props}
                    />
                    {
                        errors && errors[props.name] &&
                        <FormControl.Validation id={props.name} variant="error">
                            <>{errors[props.name].message ?? ""}</>
                        </FormControl.Validation>
                    }
                </>
            }
            {(!register || !props.name) &&
                <TextInput

                    {...props}
                />
            }
        </>
    );
};

export default MyTextInput;