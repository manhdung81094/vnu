import { Button, ButtonProps, Spinner, Tooltip } from '@primer/react';
interface IMyButtonProps extends ButtonProps {
    text?: string,
    isLoading?: boolean,
    tooltip?: string,
    tooltipdDirection?: 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw',
}
const Loading = () => {
    return <Spinner size='small' />
}
const MyButton = (props: IMyButtonProps) => {

    return (
        <>
            {!props.tooltip &&
                <Button
                    {...props}
                    size={props.size ?? "small"}
                    leadingVisual={(props.isLoading) ? Loading : props.leadingVisual}
                    disabled={props.isLoading || props.disabled}
                  
                >
                    {props.text}
                    {props.children}
                </Button>
            }
            {props.tooltip &&
                <Tooltip aria-label={props.tooltip} direction={props.tooltipdDirection ?? 'n'}>

                    <Button
                        {...props}
                        size={props.size ?? "small"}
                        leadingVisual={(props.isLoading) ? Loading : props.leadingVisual}
                        disabled={props.isLoading || props.disabled}
                    >
                        {props.text}
                        {props.children}
                    </Button>
                </Tooltip>

            }
        </>

    );
};

export default MyButton;