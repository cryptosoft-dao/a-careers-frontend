import { useTranslations } from "next-intl";
import Typography from "@mui/material/Typography";

import { StyledInputMultiline } from "@/components/forms/fields/StyledInputMultiline";

import { checkError } from "@/lib/helper";

import { IForm } from "../stepper";
import { TaskFormWrapper } from "@/components/Task/form.component";

export default function Description({ formik }: IForm) {
    const trans = useTranslations('tasks')
    return (
        <div className="h-full flex flex-col pb-1">
            <TaskFormWrapper
                title={trans("job_description")}
                description={trans("add_detailed_description_to_get_more_responses")}
            />
            <StyledInputMultiline
                error={checkError(formik, {}, "description")}
                fullWidth
                multiline
                onChange={formik.handleChange}
                inputProps={{
                    style: {
                        height:"98%",
                        marginBottom: "auto"
                    }
                }}
                id="description"
                value={formik.values.description}
                name="description" />
        </div>
    )
}