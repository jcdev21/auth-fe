/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";

const StyledButton = props => {
    const theme = useTheme();
    return (
        <button
            css={{
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                padding: '8px 12px',
                backgroundColor: theme.colors.first,
                color: theme.colors.second,
                fontSize: 14,
                fontWeight: 500,
                borderRadius: '5px',
                transition: '.2s all',
                '&:hover,&:focus': {
                    backgroundColor: theme.colors.third,
                    color: theme.colors.four,
                }
            }}
            {...props}
        />
    );
};

const Button = ({submit = false, text}) => (
    <StyledButton
        css={{
            fontSize: 14,
            fontWeight: 700,
        }}
        type={submit ? 'submit' : 'button'}
    >
        {text}
    </StyledButton>
);

export default Button;
