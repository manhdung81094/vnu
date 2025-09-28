import { Box } from '@primer/react';
import React, { useMemo } from 'react';
interface IUserAvatarProps {
    url?: string,
    fullName?: string,
    size?: "small" | "medium" | "large" | "xlarge"
}
const UserAvatar = (props: IUserAvatarProps) => {
    // console.log({
    //     xxxx: props.url,
    //     fullName: props.fullName
    // });

    const character = useMemo(() => {
        if (props.fullName) {
            const texts = props.fullName.split(' ');
            return texts[texts.length - 1].split('')[0];
        }
        return "";
    }, [props.fullName])
    const width = useMemo(() => {
        if (props.size === "small") {
            return "16px";
        }
        if (props.size === "large") {
            return "32px";
        }
        if (props.size === "xlarge") {
            return "40px";
        }
        return "24px";
    }, [props.size])
    // console.log({
    //     character,
    //     url: props.url
    // });

    return (
        <Box>
            {props.url && props.url != 'null' && props.url != "" && <img alt='avatar' src={`${props.url}`}
                width={width}
                height={width}
                style={{
                    borderRadius: "50%",

                }}
            />
            }
            {(!props.url || props.url === "" || props.url === 'null') &&
                <img alt='avatar' src={`../../../../images/${character}.png`}
                    width={width}
                    height={width}
                    style={{
                        borderRadius: "50%",

                    }}
                />
                // <Box sx={{
                //     backgroundColor: "#d0d7de",
                //     borderRadius: "50%",
                //     width: width,
                //     height: width,
                //     display: "flex",
                //     alignItems: "center!important",
                //     justifyContent: "center!important",
                //     color: "#000"
                // }}>
                //     {character}
                // </Box>

            }
        </Box>
    );
};

export default UserAvatar;