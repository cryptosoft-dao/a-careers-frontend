import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Link from "@/components/Link";
import { CircularLoading } from '@/components/features/Loaders';

import DaimondIcon from "@/assets/DaimondProfile.svg";

import { IContent } from '@/interfaces/request';
import { UserResponse } from '@/openapi/client';

import useUserStats from '@/hooks/useUserStats';

interface IResponseCardProps {
    response: UserResponse;
    isSelected: boolean;
    select: () => void;
    viewProfile: () => void;
}

interface IResponseViewProps {
    responses: IContent<UserResponse[]>;
    selectedResponse?: UserResponse;
    selectResponse: (response: UserResponse) => void;
    viewProfile: (response: UserResponse) => void;
}

function ResponseCard({ isSelected, response, select, viewProfile }: IResponseCardProps) {
    const trans = useTranslations();
    const { stats, loadStats } = useUserStats();

    useEffect(() => {
        if (!response.freelancer) return;
        loadStats(response.freelancer.index);
    }, [])

    return (
        <Card
            sx={{
                bgcolor: isSelected ? "secondary.main" : "info.main",
                color: isSelected ? "common.black" : "common.white",
                width: "100%",
                borderTopLeftRadius: "44px",
                borderBottomLeftRadius: "21px",
                borderBottomRightRadius: "13px"
            }}>
            <CardHeader
                onClick={select}
                avatar={
                    <Image src={DaimondIcon} alt={response.freelancer?.nickname || ""} width={71} height={71} className='aspect-square' />
                }
                action={
                    <Typography variant="caption">
                        <Link href="" className="!font-SFProRegular border-b pb-[2px] text-[10px] border-[#fffff] mb-2" noLinkStyle onClick={viewProfile}>
                            {trans("response.profile")} 📖
                        </Link>
                    </Typography>
                }
                title={<div>
                    <span className='!font-SFProBold !text-[12px] mr-2'>@{response.freelancer?.nickname || ""}</span>
                    <span className='!font-SFProRegular !text-[12px]'>✅ {stats.customer} ❎ {stats.freelancer}</span>
                </div>}
                subheader={
                    <p className='!font-SFProRegular text-[9.5px] mt-1'>{response.freelancer?.specialization || ""}</p>
                }
                subheaderTypographyProps={{
                    sx: { color: isSelected ? "common.black" : "common.white", fontSize: "9px" }
                }}
                className="border-b-[1px] border-primary"
            />
            <CardContent onClick={select}>
                <p className='!font-SFProRegular text-[9.5px] mb-2'> {response.text}</p>
                <div className="!text-[12px] !font-SFProRegular">
                    {trans('response.offer')}: 💎 {response.price}
                </div>
                <div className={`w-[21px] h-[21px] ml-auto -mb-3 rounded-full ${isSelected ? "bg-transparent" : "bg-[#000015]"}`}></div>
            </CardContent>
        </Card>
    );
}

const MemoizedResponseCard = React.memo(ResponseCard);

export default function ResponseView(props: IResponseViewProps) {
    return props.responses.loading ? <CircularLoading /> : <Stack spacing="20px" direction="column">
        {
            props.responses.content.map((res, index) => <MemoizedResponseCard
                key={index}
                response={res}
                select={() => props.selectResponse(res)}
                isSelected={props.selectedResponse?.id === res.id ? true : false}
                viewProfile={() => props.viewProfile(res)}
            />)
        }
    </Stack>
}
