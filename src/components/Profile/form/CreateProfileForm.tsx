"use client"
import React from "react";

import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { useMasterContract } from "@/hooks/useMasterContract";
import { useTonClient } from '@/hooks/useTonClient';
import useTxChecker from "@/hooks/useTxChecker";

import { UserContentData, buildUserContent } from '@/contracts/User';

import ProfileForm, { UserFormValues } from "@/components/Profile/form/ProfileForm";

import { useAuthContext } from "@/lib/provider/auth.provider";

import { getUserProfile } from "@/services/profile";

export default function CreateProfile() {

    const locale = useLocale();
    const trans = useTranslations();
    const { userNextIndex, address: masterContractAddr, sendCreateUser } = useMasterContract();
    const { user, updateUser } = useAuthContext()
    const router = useRouter();
    const { client } = useTonClient();
    const { checkTxProgress } = useTxChecker();

    const createUserProfile = async (values: UserFormValues, callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {

        if (userNextIndex == null || client == null || user?.found) {
            await callback({ isError: true, message: trans("errors.something_went_wrong_sorry") })
            return;
        }

        try {
            const userContentData: UserContentData = {
                isUser: true,
                isFreelancer: true,
                nickname: values.nickname,
                telegram: values.telegram,
                about: values.about,
                website: values.website,
                portfolio: values.portfolio,
                resume: values.resume,
                specialization: values.specialization.join(","),
                language: values.language,
            };

            await sendCreateUser("0.3", 0, buildUserContent(userContentData));

            checkTxProgress(async (successCB) => {
                //Fetch profile
                const profileRes = await getUserProfile({ address: user?.data?.userAddress || "", locale });
                if (profileRes.data?.found) {
                    successCB();
                    await callback({
                        isError: false,
                        message: trans("profile.profile_successfully_connected"),
                    });
                    updateUser(profileRes.data);
                    router.push(`/${locale}`);
                }
            });
        } catch (e) {
            await callback({ isError: true, message: trans("errors.something_went_wrong_sorry") });
        }
    };

    return (
        <ProfileForm action="create" title={trans("profile.create")} onSubmit={createUserProfile} />
    );
}
