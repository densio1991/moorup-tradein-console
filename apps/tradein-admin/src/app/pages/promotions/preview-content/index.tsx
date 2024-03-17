/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ADD_PROMOTION_CLAIMS_PAYLOAD,
  ADD_PROMOTION_CONDITIONS_PAYLOAD,
  ADD_PROMOTION_DETAILS_PAYLOAD,
  ADD_PROMOTION_ELIGIBILITY_AND_FAQS_PAYLOAD,
  ADD_PROMOTION_STEPS_PAYLOAD,
  AppButton,
  FaqInterface,
  Flex,
  Grid,
  GridItem,
  HTMLRenderer,
  PromotionConditionItemInterface,
  PromotionProductInterface,
  PromotionStepsInterface,
  getCurrencySymbol,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { Fragment, useState } from 'react';
import styled from 'styled-components';

const StyledText = styled.span<{
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}>`
  ${(props) => props.color && `color: ${props.color};`}
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft};`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight};`}
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight};`}
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);
`;

const AccordionHeader = styled.div<{ isOpen?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
`;

const AccordionContent = styled.div<{ isOpen?: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  padding: 20px;
`;

const StyledIcon = styled(FontAwesomeIcon)<{
  color?: string;
  hovercolor?: string;
  disabled?: boolean;
}>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  margin: 0 12px;

  &:hover {
    color: ${(props) => (props.hovercolor ? props.hovercolor : 'inherit')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

const ImageContainer = styled.div`
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 5rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

export function PromotionPreview() {
  const {
    state: promotionState,
    createPromotion,
    clearPromotions,
    setAddPromotionDetailsPayload,
    setAddPromotionClaimsPayload,
    setAddPromotionStepsPayload,
    setAddPromotionConditionPayload,
    setAddPromotionEligibilityAndFaqsPayload,
  } = usePromotion();
  const {
    addPromotionDetailsPayload,
    addPromotionClaimsPayload,
    addPromotionStepsPayload,
    addPromotionConditionPayload,
    addPromotionEligibilityAndFaqsPayload,
  } = promotionState;

  const {
    state: commonState,
    setSideModalState,
    setCenterModalState,
  } = useCommon();
  const { sideModalState, centerModalState } = commonState;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (item: number) => {
    setOpenIndex((prev) => (prev === item ? null : item));
  };

  const payload = {
    ...addPromotionDetailsPayload,
    claims: addPromotionClaimsPayload,
    steps: addPromotionStepsPayload?.steps,
    conditions: addPromotionConditionPayload,
    eligibility: addPromotionEligibilityAndFaqsPayload,
  };

  return (
    <Flex>
      <Flex center>
        {/* Promotion Name */}
        <StyledText
          marginTop="1rem"
          color="#6b7280"
          fontSize="2.25rem"
          fontWeight="700"
          lineHeight="2.5rem"
        >
          {addPromotionDetailsPayload?.name}
        </StyledText>

        {/* Promotion Image */}
        <ImageContainer>
          <Image
            src={addPromotionDetailsPayload.image_url}
            alt="promotion-image"
          />
        </ImageContainer>
      </Flex>

      {/* Promotion Steps */}
      <Grid columns="4">
        {addPromotionStepsPayload?.steps?.map(
          (step: PromotionStepsInterface, index: number) => {
            return (
              <Fragment key={index}>
                <GridItem>
                  <StyledText
                    marginBottom="1rem"
                    fontWeight="700"
                    fontSize="1.25rem"
                  >{`Step ${step?.order}`}</StyledText>
                  <StyledText
                    marginBottom="1rem"
                    color="#005190"
                    fontWeight="700"
                    fontSize="1.25rem"
                  >
                    {step?.title}
                  </StyledText>
                  <StyledText fontSize="0.875rem">
                    {step?.description}
                  </StyledText>
                </GridItem>
              </Fragment>
            );
          },
        )}
      </Grid>

      {/* Promotion Description */}
      <Flex>
        <StyledText marginTop="2rem" marginBottom="2rem">
          {addPromotionDetailsPayload?.description}
        </StyledText>
      </Flex>

      {/* Promotion Claims */}
      <Flex>
        <StyledText
          marginBottom="1rem"
          color="#005190"
          fontWeight="700"
          fontSize="1.5rem"
        >
          {addPromotionClaimsPayload?.title}
        </StyledText>
        <StyledText marginBottom="1.5rem">
          {addPromotionClaimsPayload?.description}
        </StyledText>
        <div style={{ margin: '0rem 3rem' }}>
          <Grid columns="2" gap="0px">
            {addPromotionClaimsPayload?.products?.map(
              (product: PromotionProductInterface, index: number) => {
                return (
                  <Fragment key={index}>
                    <GridItem padding="20px" border="1px solid #ececec">
                      <StyledText fontWeight="700">
                        {product?.product_name}
                      </StyledText>
                    </GridItem>
                    <GridItem padding="20px" border="1px solid #ececec">
                      <StyledText>{`${getCurrencySymbol(product?.currency)}${product?.amount}`}</StyledText>
                    </GridItem>
                  </Fragment>
                );
              },
            )}
          </Grid>
        </div>
        <StyledText marginTop="1.5rem" marginBottom="1.5rem">
          {addPromotionClaimsPayload?.disclaimer}
        </StyledText>
      </Flex>

      {/* Conditions */}
      <Flex>
        <StyledText
          marginBottom="1rem"
          color="#005190"
          fontWeight="700"
          fontSize="1.5rem"
        >
          {addPromotionConditionPayload?.title}
        </StyledText>
        {addPromotionConditionPayload?.items?.map(
          (item: PromotionConditionItemInterface, index: number) => {
            return (
              <Fragment key={index}>
                <StyledText marginLeft="1rem">{`${item?.order}. ${item?.description}`}</StyledText>
              </Fragment>
            );
          },
        )}
      </Flex>

      {/* Eligibility and FAQs */}
      <Flex>
        <StyledText
          marginTop="2rem"
          marginBottom="1rem"
          color="#005190"
          fontWeight="700"
          fontSize="1.5rem"
        >
          {addPromotionEligibilityAndFaqsPayload?.title}
        </StyledText>
        <AccordionContainer>
          {addPromotionEligibilityAndFaqsPayload?.faq?.map(
            (faq: FaqInterface, index: number) => {
              return (
                <Fragment key={index}>
                  <AccordionHeader
                    onClick={() => toggleAccordion(index)}
                    isOpen={openIndex === index}
                  >
                    <StyledText
                      fontWeight="500"
                      fontSize="1.25rem"
                      lineHeight="1.75rem"
                    >
                      {faq?.title}
                    </StyledText>
                    <StyledIcon
                      icon={openIndex === index ? faAngleDown : faAngleUp}
                      color={openIndex === index ? 'inherit' : '#ccc'}
                    />
                  </AccordionHeader>
                  <AccordionContent isOpen={openIndex === index} key={index}>
                    <HTMLRenderer htmlContent={faq?.content} />
                  </AccordionContent>
                </Fragment>
              );
            },
          )}
        </AccordionContainer>
      </Flex>

      <Flex center>
        <AppButton
          type="button"
          variant="fill"
          width="fit-content"
          onClick={() => {
            createPromotion(payload);
            clearPromotions({});
            setSideModalState({
              ...sideModalState,
              open: false,
              view: null,
            });

            setCenterModalState({
              ...centerModalState,
              open: false,
              view: null,
            });

            // Clear forms on submit
            setAddPromotionDetailsPayload(ADD_PROMOTION_DETAILS_PAYLOAD);
            setAddPromotionClaimsPayload(ADD_PROMOTION_CLAIMS_PAYLOAD);
            setAddPromotionStepsPayload(ADD_PROMOTION_STEPS_PAYLOAD);
            setAddPromotionConditionPayload(ADD_PROMOTION_CONDITIONS_PAYLOAD);
            setAddPromotionEligibilityAndFaqsPayload(
              ADD_PROMOTION_ELIGIBILITY_AND_FAQS_PAYLOAD,
            );
          }}
        >
          Click to Submit
        </AppButton>
      </Flex>
    </Flex>
  );
}
