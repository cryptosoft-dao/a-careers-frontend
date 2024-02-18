"use client"
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import React from "react";
import {
    List,
    ListItemButton,
    ListItemText,
    ListItem,
    Stack,
    Drawer as MuiDrawer,
    Box, Typography
} from '@mui/material';

import Logo from "@/app/logo";
import CloseButton from "@/components/ui/buttons/CloseButton";
import ConnectButton from "@/components/ui/buttons/ConnectButton";
import AppBar from "@/components/layout/app-bar";
import {NextLinkComposed} from "@/components/Link";
import Avatar from "@mui/material/Avatar";
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import {useAppContext} from "@/lib/app-providers";
import LanguageToggler from "@/components/layout/drawer/LanguageToggler";
import UserAvatar from "@/components/UserAvatar";

interface Props {
    routes: { label: string, to: string }[];
    withAuth?: boolean;
}

const DrawerContent = ({routes, withAuth}: Props) => {
    const {isDrawerOpen, toggleDrawer} = useAppContext()
    const pathname = usePathname();
    const t = useTranslations("common");
    return (
        <MuiDrawer
            variant="temporary"
            onClose={() => toggleDrawer(false)}
            open={isDrawerOpen}
            sx={{
                zIndex: theme => theme.zIndex.drawer + 2,
                width: "100vw",

            }}
            PaperProps={{
                sx: {
                    width: "100%",
                    backgroundColor: theme => theme.palette.background.paper,
                    backgroundImage: 'none'
                },
            }}
        >
            <div className="w-[375px] h-full mx-auto">
                <AppBar>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Logo/>
                    </Stack>
                    <Box component="div" sx={{flexGrow: 1}}/>
                    <Stack><ConnectButton text={t('connect')}/></Stack>
                    <Stack direction="row" alignItems="center" style={{marginLeft: 10}}>
                        <CloseButton onClick={() => toggleDrawer(false)}/>
                    </Stack>
                </AppBar>
                <Stack spacing={0} className="pt-[70px] h-full">
                    <div className="h-[200px]">
                        {withAuth && (
                            <>
                                <Stack spacing="20px" className="py-[30px]" direction="column" justifyContent="center"
                                       alignItems="center">
                                    <UserAvatar/>
                                    <div className="text-center">
                                        <Typography variant="h4">
                                            @new_user
                                        </Typography>
                                        <Typography variant="caption">
                                            <Link className="underline" noLinkStyle href={"/profile"}>
                                                {t("profile")} 📖
                                            </Link>
                                        </Typography>
                                    </div>
                                </Stack>
                                <Divider/>
                            </>
                        )}
                    </div>
                    <nav className="grow">
                        <List>
                            {routes.map((e, index) => {
                                const [, , ...segments] = pathname.split('/');
                                const pathnameWithoutLocale = segments.join("/");

                                const isSelectedRoute = `/${pathnameWithoutLocale}` === e.to
                                console.log(pathnameWithoutLocale, isSelectedRoute)
                                return (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton
                                            sx={{
                                                "&.Mui-selected": {
                                                    color: "text.primary"
                                                }
                                            }}
                                            onClick={() => toggleDrawer(false)}
                                            component={NextLinkComposed}
                                            to={e.to}
                                            selected={isSelectedRoute}>
                                            <ListItemText
                                                sx={{textAlign: "center"}}
                                                primaryTypographyProps={{"color": isSelectedRoute ? "text.primary" : "text.secondary"}}
                                                primary={e.label}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </nav>
                    <Box component="div" sx={{padding: "16px"}}>
                        <Stack direction="row" spacing={2}
                               justifyContent="space-between">
                            <Typography component="div" sx={{color: "text.secondary"}} variant="body2">
                                {t("text_support")}
                            </Typography>
                            <LanguageToggler/>
                        </Stack>
                    </Box>
                </Stack>
            </div>
        </MuiDrawer>
    )
}

export default DrawerContent;
