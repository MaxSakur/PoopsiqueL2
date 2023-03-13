import { memo } from "react";
import { useTranslation } from "react-i18next";
import Column from "../../components/column";
import ScreenContainer from "../../components/screenContainer";
import EnchantCalculator from "./enchantCalculator";

const Craft = () => {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <Column flex={1} headContent={<p>{t("craft.header")}</p>} />
      <Column flex={2} headContent={<p>{t("craft.resourses")}</p>} />
      <Column
        flex={1}
        bodyStyles={{ minHeight: "320px" }}
        headContent={<p>{t("craft.enchant_emulator")} </p>}
        bodyContent={<EnchantCalculator />}
      />
    </ScreenContainer>
  );
};

export default memo(Craft);
