import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import Column from "../../components/column";
import ScreenContainer from "../../components/screenContainer";
import EnchantCalculator from "./enchantCalculator";
import CraftInitializer from "./craftInitializer";
import ResourseCalculator from "./resourseCalculator";

const Craft = () => {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <Column
        flex={1}
        bodyStyles={{ minHeight: "320px" }}
        headContent={<h2>{t("craft.header")}</h2>}
        bodyContent={<CraftInitializer />}
      />
      <Column
        flex={2}
        headContent={<h2>{t("craft.resourses")}</h2>}
        bodyContent={<ResourseCalculator />}
      />
      <Column
        flex={1}
        bodyStyles={{ minHeight: "320px" }}
        headContent={<h2>{t("craft.enchant_emulator")} </h2>}
        bodyContent={<EnchantCalculator />}
      />
    </ScreenContainer>
  );
};

export default memo(Craft);
