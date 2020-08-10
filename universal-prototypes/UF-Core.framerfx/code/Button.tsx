import * as React from "react"
import { motion, addPropertyControls, ControlType, useNavigation } from "framer"
// Import Variables & Type
import { colors, spacing, shadows } from "./Variables"
import * as Text from "./Typography"
import styled from "styled-components"

// Set props
interface Props {
    text: String
    buttonStyle: String
}

// Create styled button component
const StyledButton = styled(motion.button).attrs((props: Props) => {
    const { text, buttonStyle } = props
    return {
        text: text,
        buttonStyle: buttonStyle,
    }
})`
    cursor: pointer;
    width: 100%;
    height: ${spacing["5x"]};
    padding: 0 ${spacing["2x"]};
    background: ${(props) =>
        props.buttonStyle === "tertiary" || props.buttonStyle === "secondary"
            ? "transparent"
            : colors.primary900};
    outline: none;
    border: ${(props) =>
        props.buttonStyle === "secondary"
            ? "1px solid " + colors.primary600
            : "transparent"};
    border-radius: 1.5rem;
    box-shadow: ${(props) => props.buttonStyle === "primary" ? shadows.z1 : "none" };
    transition: all 0.25s ease-in-out;
    &:hover {
        box-shadow: ${(props) => props.buttonStyle === "primary" || props.buttonStyle === "secondary" ? shadows.z1 : "none"} ;
    }
    &:active {
        box-shadow: none;
        transform: scale(.98);
    }

    &.not-enabled {
        background: ${(props) =>
            props.buttonStyle === "tertiary" ||
            props.buttonStyle === "secondary"
                ? "transparent"
                : colors.grey400};
        border-color: ${(props) =>
            props.buttonStyle === "tertiary" || props.buttonStyle === "primary"
                ? "transparent"
                : colors.grey400};
    }
,
    &.lg {
        display: block;
        width: ${"100%" > "300px" ? "300px" : "100%"};
        height: 2.5rem;
    }
`

// Export button component
export function Button(props: any) {
    const { text, buttonStyle, isEnabled, onTap, style, ...rest } = props
    const labelStyle =
        isEnabled && buttonStyle != "primary"
            ? colors.primary600 : isEnabled && buttonStyle != "primary" ? colors.grey700
                : colors.white
    return (
        <StyledButton onTap={onTap} buttonStyle={buttonStyle} style={style} className={!isEnabled ? "not-enabled" : null}>
            <Text.ButtonText color={labelStyle}>{text}</Text.ButtonText>
        </StyledButton>
    )
}

Button.defaultProps = {
    text: "Heeey",
    buttonStyle: "primary",
    width: 375,
    height: 40,
}

addPropertyControls(Button, {
    text: {
        title: "Text",
        type: ControlType.String,
    },
    buttonStyle: {
        title: "Style",
        type: ControlType.Enum,
        options: ["primary", "secondary", "tertiary"],
        optionTitles: ["Primary", "Secondary", "Tertiary"],
    },
    isEnabled: {
        title: "Enabled",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    onTap: {
        type: ControlType.EventHandler,
    }
})
