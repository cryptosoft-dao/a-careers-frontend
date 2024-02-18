import Image from "@/components/Image";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@/components/Link";
import Chip from "@mui/material/Chip";
import React from "react";
import {useTranslations} from "next-intl";
import {User} from "@/openapi/client";

interface HistoryType {
    date: string;
    type: string;
    title: string;
    smartContract: string;
    price: string;
}


const temp = [
    {
        date: "12 янв 2023, 17:00",
        type: "out",
        title: "Получил входящий арбитраж",
        smartContract: "EQCISAJu…W_JqYM3t",
        price: "− 0.011 TON",
    },
    {
        date: "12 янв 2023, 17:00",
        type: "in",
        smartContract: "EQCISAJu…W_JqYM3t",
        price: "",
        title: "Создал задачу"
    },
    {
        date: "12 янв 2023, 17:00",
        type: "out",
        smartContract: "EQCISAJu…W_JqYM3t",
        price: "",
        title: "Создал задачу"
    },
    {
        date: "12 янв 2023, 17:00",
        type: "out",
        smartContract: "EQCISAJu…W_JqYM3t",
        price: "− 0.011 TON",
        title: "Создал задачу"
    },
    {
        date: "12 янв 2023, 17:00",
        type: "out",
        smartContract: "EQCISAJu…W_JqYM3t",
        price: "− 0.011 TON",
        title: "Создал задачу"
    },
    {
        date: "12 янв 2023, 17:00",
        type: "out",
        smartContract: "EQCISAJu…W_JqYM3t",
        price: "",
        title: "Создал задачу"
    },
    {
        date: "12 янв 2023, 17:00",
        type: "out",
        smartContract: "EQCISAJu…W_JqYM3t",
        price: "",
        title: "Создал задачу"
    },
    {
        date: "12 янв 2023, 17:00",
        type: "out",
        smartContract: "EQCISAJu…W_JqYM3t",
        price: "− 0.011 TON",
        title: "Создал задачу"
    },
]

const History = ({data}: { data: HistoryType[] }) => {
    return (
        <Stack component="div" spacing="1px" >
            {data.map((e, i) => (
                <Stack className="bg-info px-[20px] py-2" direction="column" key={i}>
                    <Typography variant="caption" component="div">{e.date}</Typography>
                    <Stack direction="row" spacing={1} className="h-[30px]">
                        <div>{e.type === 'in' ? "↘" : "↗"}</div>
                        <div className="flex-grow">
                            <Typography component="div" variant="body2">
                                {e.title}
                            </Typography>
                            <Typography component="div" color="secondary" variant="body2">
                                <Link noLinkStyle href={`https://domain.com/${e.smartContract}`}>
                                    {e.smartContract}
                                </Link>
                            </Typography>
                        </div>
                        {e.price && (
                            <Typography component="div" variant="h6">{e.price}</Typography>
                        )}
                    </Stack>
                </Stack>
            ))}
        </Stack>
    )
}


// const userTemp = {
//     username: "@new_user",
//     smartContract: "EQCISAJu…W_JqYM3t",
//     telegram: "@some_wallet",
//     about: "🎯 dApp любой сложности\n" +
//         "💎 Премиум дизайн (UI/UX)!\n" +
//         "⚙️ Адаптивная верстка – на профессиональном уровне!🏆 Золотой партнёр «1С-Битрикс» (нет) !\n" +
//         "\n" +
//         "✔️ Blockchain-продвижение сайтов на лидирующие позиции. Взлом рынков, соц. инжинеринг",
//     site: "my-little-studio.ton",
//     portfolio: "https://github.com/somewallet",
//     resume: "https://github.com/somewallet",
//     specialization: ["FunC", "FIFT", "Toncenter API"],
//     image: "/profile.png"
// }

const ProfileView = ({data, history}: { data: User, history: HistoryType[] }) => {
    const t = useTranslations("profile");
    const tc = useTranslations("common");
    const renderSpecialization = ()=>{
        if (!data?.specialization) return <div/>
        const specialization = data.specialization.split(",")
        return specialization.map((e: string, i: number)=> <Chip key={i} label={e} color="secondary"/>)
    }
    return (
        <>
            <div className="p-5">
                <div className="bg-[#000] rounded text-center align-middle h-[335px] w-[334] text-[196px]">
                    🦄
                </div>
                <Stack spacing={"20px"} className="pt-[35px]">

                    <Typography variant="h4">{data?.nickname}</Typography>
                    <div>
                        <Typography component="div" variant="caption">
                            {tc("smart_contract_address")}
                        </Typography>
                        <Typography className="mt-1" variant="body2">
                            {data?.address}
                        </Typography>
                    </div>
                    <div>
                        <Typography component="div" variant="caption">
                            Telegram
                        </Typography>
                        <Typography className="mt-1" color="secondary" variant="body2">
                            <Link noLinkStyle href={"https://t.me/user.telegram"}>
                                {data?.telegram}
                            </Link>
                        </Typography>
                    </div>
                    <div>
                        <Typography component="div" variant="caption">
                            {t("about")}
                        </Typography>
                        <Typography variant="body2">
                            {data?.about}
                        </Typography>
                    </div>
                    <div>
                        <Typography component="div" variant="caption">
                            {t("site")}
                        </Typography>
                        <Typography className="mt-1" variant="body2">
                            {data?.website}
                        </Typography>
                    </div>
                    <div>
                        <Typography component="div" variant="caption">
                            {t("portfolio")}
                        </Typography>
                        <Typography className="mt-1" variant="body2">
                            {data?.portfolio}
                        </Typography>
                    </div>
                    <div>
                        <Typography component="div" variant="caption">
                            {t("resume")}
                        </Typography>
                        <Typography variant="body2">
                            {data?.resume}
                        </Typography>
                    </div>
                    <div>
                        <Typography component="div" variant="caption">
                            {t("specialization")}
                        </Typography>
                        <Stack component="div" className="mt-1" direction={"row"} spacing={1}>
                            {renderSpecialization()}
                        </Stack>
                    </div>

                    <div>
                        <Typography variant="h4">{t("task_history")}</Typography>
                        <Typography className="mt-2" variant="body2">
                            {t("task_result", {"payed": "100%", completed: "99%"})}
                        </Typography>
                    </div>
                </Stack>
            </div>
            {history && <History data={history}/>}
        </>
    )
}

export default ProfileView;
