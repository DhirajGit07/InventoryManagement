import { useState } from "react";
import { Card, TextContainer, Text, Button, Stack, Spinner } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

export function ProductsCard() {
  const shopify = useAppBridge();
  const { t } = useTranslation();
  const [isPopulating, setIsPopulating] = useState(false);
  const productsCount = 5;

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
  } = useQuery({
    queryKey: ["productCount"],
    queryFn: async () => {
      const response = await fetch("/api/products/count");
      return await response.json();
    },
    refetchOnWindowFocus: false,
  });

  const setPopulating = (flag) => {
    shopify.loading(flag);
    setIsPopulating(flag);
  };

  const handlePopulate = async () => {
    setPopulating(true);
    const response = await fetch("/api/products", { method: "POST" });

    if (response.ok) {
      await refetchProductCount();

      shopify.toast.show(
        t("ProductsCard.productsCreatedToast", { count: productsCount })
      );
    } else {
      shopify.toast.show(t("ProductsCard.errorCreatingProductsToast"), {
        isError: true,
      });
    }

    setPopulating(false);
  };

  return (
    <Card title={t("ProductsCard.title")} sectioned>
      <Stack vertical spacing="loose">
        <TextContainer>
          <Text variant="headingMd" as="h3">
            {t("ProductsCard.totalProductsHeading")}
          </Text>
          <Text variant="bodyMd" as="p" fontWeight="semibold">
            {isLoadingCount ? <Spinner accessibilityLabel="Loading" size="small" /> : data?.count}
          </Text>
          <Text variant="bodyMd">{t("ProductsCard.description")}</Text>
        </TextContainer>
        
        <Button
          primary
          loading={isPopulating}
          onClick={handlePopulate}
        >
          {t("ProductsCard.populateProductsButton", { count: productsCount })}
        </Button>
      </Stack>
    </Card>
  );
}
