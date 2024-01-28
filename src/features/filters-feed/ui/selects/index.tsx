import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";

import { filterFeedSelectsI, filterFeedSelects } from "@/entities/orders";
import s from "./style.module.scss";

import next_icon from "@/shared/assets/next.svg";
import { Hr } from "@/shared/ui/hr";
import { Link } from "atomic-router-react";

export const Selects = () =>
  filterFeedSelects.map((filterArgument) => (
    <SelectFilter {...filterArgument} />
  ));

const SelectFilter = ({
  icon,
  title,
  translation,
  link,
  $chooseFilter,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: filterFeedSelectsI<any>) => {
  const { t } = useTranslation();
  const value = useStore($chooseFilter);

  return (
    <Link to={link} className={s.container}>
      <div className={s.content}>
        <div className={s.left_content}>
          <h3 className={s.title_icon_filters}>{icon}</h3>
          <div>
            <p className={s.title_filters}>{t(title)}</p>
            <p className={s.value_filters}>{t(`${translation}.${value}`)}</p>
          </div>
        </div>

        <img src={next_icon} alt="Next" />
      </div>

      <Hr theme="linear-gradient" className={s.border_bottom} />
    </Link>
  );
};
