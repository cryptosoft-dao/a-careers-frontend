import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import StatusChip from "@/components/StatusChip";

interface DataType {
    title: string;
    date: string;
    diamonds: number;
    proposals: number;
}

const TaskList = ({data, link}: { data: DataType[], link: string }) => {
    return (
        <Stack spacing={"15px"} divider={<Divider/>}>
            {data.map((e, i) => {
                return (
                    <Stack spacing="3px" key={i}>
                        <Typography variant="h6">
                            <Link href={link} noLinkStyle>
                                {e.title}
                            </Link>
                        </Typography>
                        <Typography component="div" variant="caption">
                            {e.date}
                        </Typography>
                        <Typography   variant="body2">
                            💎 {e.diamonds}
                        </Typography>
                        {e.proposals === 0 && <StatusChip status={"no_responses"}/>}
                    </Stack>
                )
            })}
        </Stack>
    )
}

export default TaskList;
