import { lighten } from 'polished'
import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes, ThemeContext } from 'styled-components'

interface ButtonProps {
	children?: React.ReactNode
	disabled?: boolean
	href?: string
	onClick?: () => void
	size?: 'sm' | 'md' | 'lg'
	text?: any
	to?: string
	variant?: 'default' | 'secondary' | 'tertiary'
	inline?: boolean
	width?: string
	target?: string
	border?: boolean
}

const Button: React.FC<ButtonProps> = ({
	children,
	disabled,
	href,
	onClick,
	size,
	text,
	to,
	variant,
	inline,
	width,
	target,
	border,
}) => {
	const { color, spacing } = useContext(ThemeContext)

	let buttonColor: string
	switch (variant) {
		case 'secondary':
			buttonColor = '#a1a0a0'
			break
		case 'default':
		default:
			buttonColor = '#f7f4f2'
	}

	let boxShadow: string
	let buttonSize: number
	let buttonPadding: number
	let fontSize: string
	switch (size) {
		case 'sm':
			boxShadow = `4px 4px 8px ${color.primary[600]},
        -8px -8px 16px ${color.primary[500]};`
			buttonPadding = spacing[4]
			buttonSize = 40
			fontSize = '0.75rem'
			break
		case 'lg':
			boxShadow = `6px 6px 12px ${color.primary[600]},
        -12px -12px 24px ${color.primary[500]};`
			buttonPadding = spacing[4]
			buttonSize = 72
			fontSize = '1rem'
			break
		case 'md':
		default:
			boxShadow = `6px 6px 12px ${color.primary[600]},
        -12px -12px 24px -2px ${color.primary[500]};`
			buttonPadding = spacing[4]
			buttonSize = 50
			fontSize = '1rem'
	}

	const ButtonChild = useMemo(() => {
		if (to != '' && to != null) {
			return <StyledLink to={to}>{text}</StyledLink>
		} else if (href) {
			return (
				<StyledExternalLink href={href} target="__blank">
					{text}
				</StyledExternalLink>
			)
		} else {
			return text
		}
	}, [href, text, to])

	const ButtonComp = !border ? StyledButton : StyledBorderButton
	return (
		<ButtonComp
			boxShadow={boxShadow}
			color={buttonColor}
			disabled={disabled}
			fontSize={fontSize}
			onClick={onClick}
			padding={buttonPadding}
			size={buttonSize}
			inline={inline}
			width={width}
			target={target}
		>
			{children}
			{ButtonChild}
		</ButtonComp>
	)
}

interface StyledButtonProps {
	boxShadow: string
	color: string
	disabled?: boolean
	fontSize: string
	padding: number
	size: number
	inline: boolean
	width: string
	target?: string
}

const AnimateGradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}`

const StyledButton = styled.button.attrs((attrs: StyledButtonProps) => ({
	target: attrs.target || '',
}))<StyledButtonProps>`
	padding: 0.7rem 1.7rem;
	align-items: center;
	background-color: ${(props) => props.theme.color.secondary[300]};
	background-image: linear-gradient(
		135deg,
		${(props) => props.theme.color.secondary[400]} 0%,
		${(props) => props.theme.color.secondary[300]} 51%,
		${(props) => props.theme.color.secondary[500]} 100%
	);
	background-size: 200% 200%;
	border: 1px solid ${(props) => props.theme.color.primary[500]};
	box-shadow: ${(props) => props.theme.boxShadow.default};
	border-radius: ${(props) => props.theme.borderRadius}px;
	color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
	display: ${(props) => (props.inline ? 'inline-block' : 'flex')};
	font-size: ${(props) => props.fontSize};
	font-weight: ${(props) => props.theme.fontWeight.strong};
	height: ${(props) => props.size}px;
	justify-content: center;
	outline: none;
	padding-left: ${(props) => props.padding}px;
	padding-right: ${(props) => props.padding}px;
	pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
	width: ${(props) => (props.width ? props.width : '100%')};
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};

	@media (max-width: 960px) {
		/* margin: 0 0.5rem 0 0.5rem; */
		text-align: center;
		text-decoration: none;
		padding: 0.25rem 1rem;
	}
	@media (max-width: 640px) {
		width: 100%;
		padding: 0.85rem 0.85rem;
	}

	:hover {
		transform: scale(1);
	}

	&:hover:before {
		transform: scale(1.2);
	}

	&:hover,
	&:focus {
		background-position: right center;
		-webkit-animation: ${AnimateGradient} 3s ease-in-out infinite;
		-moz-animation: ${AnimateGradient} 3s ease-in-out infinite;
		animation: ${AnimateGradient} 3s ease-in-out infinite;
		border-color: ${(props) => lighten(0.025, props.theme.color.primary[500])};
		color: ${(props) => props.theme.color.primary[100]};
		cursor: ${(props) =>
			props.disabled ? 'not-allowed' : 'pointer'} !important;
	}
`

const StyledLink = styled(Link)`
	align-items: center;
	color: inherit;
	display: flex;
	flex: 1;
	height: 50px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;

	&:hover,
	&:focus {
		color: ${(props) => props.theme.color.primary[100]};
	}
`

const StyledExternalLink = styled.a`
	align-items: center;
	color: inherit;
	display: flex;
	flex: 1;
	height: 56px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;

	&:hover,
	&:focus {
		color: ${(props) => props.theme.color.primary[100]};
	}
`

export const MaxButton = styled.a`
	padding: 5px;
	color: ${(props) => props.theme.color.primary[100]};
	background: ${(props) => props.theme.borderGradient.blueGreen};
	border-radius: ${(props) => props.theme.borderRadius}px;
	border: 1.75px solid transparent;
	vertical-align: middle;
	margin-right: ${(props) => -props.theme.spacing[2]}px;
	transition: 100ms;
	user-select: none;
	font-weight: font-weight: ${(props) => props.theme.fontWeight.medium};
	text-decoration: none;

	&:hover {
		background-color: ${(props) => lighten(0.1, props.theme.color.darkGrey[100])};
		color: ${(props) => props.theme.color.primary[100]};
		cursor: pointer;
	}
`

export const StyledBorderButton = styled(StyledButton)`
	background: ${(props) => props.theme.borderGradient.blueGreen};
	border-radius: ${(props) => props.theme.borderRadius};
	border: 1.75px solid transparent;
	padding: ${(props) => -props.theme.spacing[3]}px;

	&:hover,
	&:focus,
	&:active {
		background: linear-gradient(225deg, #242436, #1b1b29) padding-box,
			linear-gradient(157.5deg, #5455c9, #53c7e4) border-box;
		border: 1.75px solid transparent;
	}
`

export default Button
