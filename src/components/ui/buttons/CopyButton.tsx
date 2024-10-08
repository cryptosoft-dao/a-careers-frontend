import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";


const CopyButton = (props: IconButtonProps) => {
    return (
        <IconButton sx={{bgcolor: "info.main"}} aria-label="copy" {...props}>
            <SvgIcon sx={{fontSize: "inherit"}}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.33">
                        <rect x="0.5" y="3.5" width="6" height="6" rx="0.5" stroke="white"/>
                        <rect x="3.5" y="0.5" width="6" height="6" rx="0.5" fill="#000015" stroke="white"/>
                    </g>
                </svg>
            </SvgIcon>
        </IconButton>
    )
}

export default CopyButton;