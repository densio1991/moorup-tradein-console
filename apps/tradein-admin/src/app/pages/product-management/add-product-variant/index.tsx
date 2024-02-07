/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faAngleDown,
  faAngleUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ADD_PRODUCT_PAYLOAD,
  ADD_PRODUCT_VARIANT_PRICING_PAYLOAD,
  AppButton,
  CURRENCIES,
  ProductVariant,
  ProductVariantPricing,
  StyledInput,
  StyledReactSelect,
  hasEmptyValueInArray,
  useCommon,
  useProduct,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
  padding: 20px;
`;

const FormTitle = styled.h2`
  text-align: left;
  margin-top: auto;
  color: #01463a;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AccordionInnerContainer = styled.div`
  margin: 2px 0px;
`;

const AccordionHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const AccordionHeader = styled.div<{ isOpen?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0px 1px 0px 0px #ccc;

  :first-child {
    width: 100%;
  }

  :last-child {
    padding: 0px;
    box-shadow: 0px 1px 1px 0px #ccc;
  }
`;

const AccordionTitle = styled.span`
  font-size: 14px;
`;

const AccordionContent = styled.div<{ isOpen?: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  padding: 10px;
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

const PricingContainer = styled.div`
  box-shadow: 0px 1px 0px 0px #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

export function AddProductVariantForm() {
  const {
    state: productState,
    setAddProductPayload,
    setIncludeProductVariant,
    addProduct,
  } = useProduct();
  const { addProductPayload } = productState;

  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;

  const resetForm = () => {
    formik.resetForm();
    setOpenIndex(0);
  };

  const onSubmit = (values: any) => {
    addProductPayload.variants = values;
    addProduct(addProductPayload);
    setAddProductPayload(ADD_PRODUCT_PAYLOAD);
    setIncludeProductVariant(false);
    setSideModalState({ ...sideModalState, view: null, open: false });
  };

  const PRODUCT_VARIANT_PAYLOAD = {
    name: '',
    sku: '',
    type: addProductPayload.type,
    image_url: '',
    site_url: '',
    status: addProductPayload.status,
    pricing: [ADD_PRODUCT_VARIANT_PRICING_PAYLOAD],
  };

  const formik = useFormik({
    initialValues: [PRODUCT_VARIANT_PAYLOAD],
    onSubmit,
  });

  // const types = productTypes
  //   ?.map((item: any) => ({
  //     value: item,
  //     label: capitalizeFirstLetter(item),
  //   }))
  //   .sort((a: { label: string }, b: { label: any }) =>
  //     a.label.localeCompare(b.label),
  //   );

  // const statuses = productStatuses
  //   ?.map((item: any) => ({
  //     value: item,
  //     label: capitalizeFirstLetter(item),
  //   }))
  //   .sort((a: { label: string }, b: { label: any }) =>
  //     a.label.localeCompare(b.label),
  //   );

  const currencies = CURRENCIES?.sort(
    (a: { label: string }, b: { label: any }) => a.label.localeCompare(b.label),
  );

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (item: number) => {
    setOpenIndex((prev) => (prev === item ? null : item));
  };

  const handleInputChange = (index: number, fieldName: string, value: any) => {
    formik.setFieldValue(`[${index}].${fieldName}`, value);
  };

  const handleOnBlur = (index: number, fieldName: string) => {
    formik.setFieldTouched(`[${index}].${fieldName}`, true, false);
  };

  const handleAddNewVariantForm = () => {
    formik.setValues((prevValues) => [...prevValues, PRODUCT_VARIANT_PAYLOAD]);
  };

  const handleDeleteVariantForm = (indexToDelete: number) => {
    if (formik.values.length > 1) {
      formik.setValues((prevValues) =>
        prevValues.filter((_, index) => index !== indexToDelete),
      );
    }
  };

  const addPricingToVariant = (variantIndex: number, pricingPayload: any) => {
    formik.setValues((prevValues: any) => {
      const updatedVariants = prevValues.map((variant: any, index: number) => {
        if (index === variantIndex) {
          return {
            ...variant,
            pricing: variant?.pricing
              ? [...variant.pricing, pricingPayload]
              : [pricingPayload],
          };
        }
        return variant;
      });

      return updatedVariants;
    });
  };

  const handlePricingChange = (
    variantIndex: number,
    priceIndex: number,
    field: string,
    value: any,
  ) => {
    formik.setFieldValue(
      `[${variantIndex}].pricing[${priceIndex}].${field}`,
      value,
    );
  };

  const handlePricingOnBlur = (
    variantIndex: number,
    priceIndex: number,
    field: string,
  ) => {
    formik.setFieldTouched(
      `[${variantIndex}].pricing[${priceIndex}].${field}`,
      true,
    );
  };

  const handlePricingDelete = (variantIndex: number, priceIndex: number) => {
    const variantPricing = formik.values[variantIndex].pricing;

    if (variantPricing.length > 1) {
      if (Array.isArray(variantPricing) && variantPricing.length > priceIndex) {
        const updatedPricing = [
          ...variantPricing.slice(0, priceIndex),
          ...variantPricing.slice(priceIndex + 1),
        ];

        formik.setFieldValue(`[${variantIndex}].pricing`, updatedPricing);
      }
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Add Product Variant</FormTitle>
      <FormGroup>
        <span />
        <AppButton
          type="button"
          width="fit-content"
          onClick={() => handleAddNewVariantForm()}
          disabled={hasEmptyValueInArray(formik.values)}
        >
          Add Variant
        </AppButton>
      </FormGroup>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormGroup>
          <AccordionContainer>
            {formik.values.map((item: ProductVariant, index: number) => (
              <AccordionInnerContainer key={index}>
                <AccordionHeaderContainer>
                  <AccordionHeader
                    onClick={() => toggleAccordion(index)}
                    isOpen={openIndex === index}
                  >
                    <AccordionTitle>{`Variant ${index + 1}`}</AccordionTitle>
                    <StyledIcon
                      icon={openIndex === index ? faAngleDown : faAngleUp}
                      color={openIndex === index ? 'inherit' : '#ccc'}
                    />
                  </AccordionHeader>
                  <AccordionHeader
                    onClick={() => handleDeleteVariantForm(index)}
                  >
                    <StyledIcon
                      icon={faTrash}
                      color="#ccc"
                      hovercolor="#f44336"
                      disabled={formik.values.length <= 1}
                    />
                  </AccordionHeader>
                </AccordionHeaderContainer>
                <AccordionContent isOpen={openIndex === index} key={index}>
                  <FormGroup>
                    <StyledInput
                      type="text"
                      id={`name[${index}]`}
                      label={'Name'}
                      name={`name[${index}]`}
                      placeholder={'Name'}
                      onChange={(e) =>
                        handleInputChange(index, 'name', e.target.value)
                      }
                      value={item.name}
                      onBlur={() => handleOnBlur(index, 'name')}
                      error={Boolean(
                        formik.touched[index]?.name &&
                          isEmpty(formik.values[index]?.name),
                      )}
                      errorMessage="Name is required."
                    />
                    <StyledInput
                      type="text"
                      id={`sku[${index}]`}
                      label={'SKU'}
                      name={`sku[${index}]`}
                      placeholder={'SKU'}
                      onChange={(e) =>
                        handleInputChange(index, 'sku', e.target.value)
                      }
                      value={item.sku}
                      onBlur={() => handleOnBlur(index, 'sku')}
                      error={Boolean(
                        formik.touched[index]?.sku &&
                          isEmpty(formik.values[index]?.sku),
                      )}
                      errorMessage="SKU is required."
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <StyledReactSelect
                      label={'Type'}
                      name={`type[${index}]`}
                      isMulti={false}
                      options={types}
                      placeholder={'Select type'}
                      value={item.type}
                      onChange={(selected) =>
                        handleInputChange(index, 'type', selected.value)
                      }
                      onBlur={() => handleOnBlur(index, 'type')}
                      error={Boolean(
                        formik.touched[index]?.type &&
                          isEmpty(formik.values[index]?.type),
                      )}
                      errorMessage="Type is required."
                    />
                    <StyledReactSelect
                      label={'Status'}
                      name={`status[${index}]`}
                      isMulti={false}
                      options={statuses}
                      placeholder={'Select status'}
                      value={item.status}
                      onChange={(selected) =>
                        handleInputChange(index, 'status', selected.value)
                      }
                      onBlur={() => handleOnBlur(index, 'status')}
                      error={Boolean(
                        formik.touched[index]?.status &&
                          isEmpty(formik.values[index]?.status),
                      )}
                      errorMessage="Status is required."
                    />
                  </FormGroup> */}
                  <FormGroup>
                    <StyledInput
                      type="text"
                      id={`image_url[${index}]`}
                      label={'Image URL'}
                      name={`image_url[${index}]`}
                      placeholder={'Image URL'}
                      onChange={(e) =>
                        handleInputChange(index, 'image_url', e.target.value)
                      }
                      value={item.image_url}
                      onBlur={() => handleOnBlur(index, 'image_url')}
                      error={Boolean(
                        formik.touched[index]?.image_url &&
                          isEmpty(formik.values[index]?.image_url),
                      )}
                      errorMessage="Image URL is required."
                    />
                  </FormGroup>
                  <FormGroup>
                    <StyledInput
                      type="text"
                      id={`site_url[${index}]`}
                      label={'Site URL'}
                      name={`site_url[${index}]`}
                      placeholder={'Site URL'}
                      onChange={(e) =>
                        handleInputChange(index, 'site_url', e.target.value)
                      }
                      value={item.site_url}
                      onBlur={() => handleOnBlur(index, 'site_url')}
                      error={Boolean(
                        formik.touched[index]?.site_url &&
                          isEmpty(formik.values[index]?.site_url),
                      )}
                      errorMessage="Site URL is required."
                    />
                  </FormGroup>
                  <FormGroup>
                    <span />
                    <AppButton
                      type="button"
                      width="fit-content"
                      onClick={() =>
                        addPricingToVariant(
                          index,
                          ADD_PRODUCT_VARIANT_PRICING_PAYLOAD,
                        )
                      }
                      disabled={
                        item?.pricing?.length > 0 &&
                        hasEmptyValueInArray(item?.pricing)
                      }
                    >
                      Add Prices
                    </AppButton>
                  </FormGroup>
                  {item?.pricing.map(
                    (price: ProductVariantPricing, priceIndex: any) => {
                      const pricingTouched = formik.touched[index]?.pricing;
                      return (
                        <PricingContainer key={priceIndex}>
                          <FormGroup>
                            <StyledReactSelect
                              label={'Currency'}
                              name={`pricing[${index}][${priceIndex}].currency`}
                              isMulti={false}
                              options={currencies}
                              placeholder={'Select currency'}
                              value={price.currency}
                              onChange={(selected) =>
                                handlePricingChange(
                                  index,
                                  priceIndex,
                                  'currency',
                                  selected.value,
                                )
                              }
                              onBlur={() =>
                                handlePricingOnBlur(
                                  index,
                                  priceIndex,
                                  'currency',
                                )
                              }
                              error={Boolean(
                                pricingTouched &&
                                  pricingTouched[priceIndex]?.currency &&
                                  isEmpty(price.currency),
                              )}
                              errorMessage="Currency is required."
                            />
                            <StyledIcon
                              icon={faTrash}
                              color="#ccc"
                              hovercolor="#f44336"
                              disabled={item?.pricing.length <= 1}
                              onClick={() =>
                                handlePricingDelete(index, priceIndex)
                              }
                            />
                          </FormGroup>
                          <FormGroup>
                            <StyledInput
                              type="text"
                              id={`pricing[${index}][${priceIndex}].working`}
                              label={'Working'}
                              name={`pricing[${index}][${priceIndex}].working`}
                              placeholder={'0.00'}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue.replace(/[^0-9.]/g, '');

                                const dotCount =
                                  inputValue.split('.').length - 1;
                                if (dotCount > 1) {
                                  inputValue = inputValue.substring(
                                    0,
                                    inputValue.lastIndexOf('.'),
                                  );
                                }

                                if (inputValue.includes('.')) {
                                  const parts = inputValue.split('.');
                                  inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
                                }

                                handlePricingChange(
                                  index,
                                  priceIndex,
                                  'working',
                                  inputValue === '' ? '' : inputValue,
                                );
                              }}
                              onBlur={(e) => {
                                let inputValue = e.target.value;
                                if (inputValue !== '') {
                                  if (inputValue.startsWith('.')) {
                                    inputValue = `0${inputValue}`;
                                  }

                                  const numericValue = parseFloat(inputValue);

                                  handlePricingChange(
                                    index,
                                    priceIndex,
                                    'working',
                                    isNaN(numericValue) ? '' : numericValue,
                                  );
                                }
                              }}
                              value={price.working}
                            />
                            <StyledInput
                              type="text"
                              id={`pricing[${index}][${priceIndex}].working_damaged`}
                              label={'Damaged but Working'}
                              name={`pricing[${index}][${priceIndex}].working_damaged`}
                              placeholder={'0.00'}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue.replace(/[^0-9.]/g, '');

                                const dotCount =
                                  inputValue.split('.').length - 1;
                                if (dotCount > 1) {
                                  inputValue = inputValue.substring(
                                    0,
                                    inputValue.lastIndexOf('.'),
                                  );
                                }

                                if (inputValue.includes('.')) {
                                  const parts = inputValue.split('.');
                                  inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
                                }

                                handlePricingChange(
                                  index,
                                  priceIndex,
                                  'working_damaged',
                                  inputValue === '' ? '' : inputValue,
                                );
                              }}
                              onBlur={(e) => {
                                let inputValue = e.target.value;
                                if (inputValue !== '') {
                                  if (inputValue.startsWith('.')) {
                                    inputValue = `0${inputValue}`;
                                  }

                                  const numericValue = parseFloat(inputValue);

                                  handlePricingChange(
                                    index,
                                    priceIndex,
                                    'working_damaged',
                                    isNaN(numericValue) ? '' : numericValue,
                                  );
                                }
                              }}
                              value={price.working_damaged}
                            />
                          </FormGroup>
                          <FormGroup>
                            <StyledInput
                              type="text"
                              id={`pricing[${index}][${priceIndex}].not_working`}
                              label={'Not Working'}
                              name={`pricing[${index}][${priceIndex}].not_working`}
                              placeholder={'0.00'}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue.replace(/[^0-9.]/g, '');

                                const dotCount =
                                  inputValue.split('.').length - 1;
                                if (dotCount > 1) {
                                  inputValue = inputValue.substring(
                                    0,
                                    inputValue.lastIndexOf('.'),
                                  );
                                }

                                if (inputValue.includes('.')) {
                                  const parts = inputValue.split('.');
                                  inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
                                }

                                handlePricingChange(
                                  index,
                                  priceIndex,
                                  'not_working',
                                  inputValue === '' ? '' : inputValue,
                                );
                              }}
                              onBlur={(e) => {
                                let inputValue = e.target.value;
                                if (inputValue !== '') {
                                  if (inputValue.startsWith('.')) {
                                    inputValue = `0${inputValue}`;
                                  }

                                  const numericValue = parseFloat(inputValue);

                                  handlePricingChange(
                                    index,
                                    priceIndex,
                                    'not_working',
                                    isNaN(numericValue) ? '' : numericValue,
                                  );
                                }
                              }}
                              value={price.not_working}
                            />
                            <StyledInput
                              type="text"
                              id={`pricing[${index}][${priceIndex}].not_working_damaged`}
                              label={'Damaged and Not Working'}
                              name={`pricing[${index}][${priceIndex}].not_working_damaged`}
                              placeholder={'0.00'}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue.replace(/[^0-9.]/g, '');

                                const dotCount =
                                  inputValue.split('.').length - 1;
                                if (dotCount > 1) {
                                  inputValue = inputValue.substring(
                                    0,
                                    inputValue.lastIndexOf('.'),
                                  );
                                }

                                if (inputValue.includes('.')) {
                                  const parts = inputValue.split('.');
                                  inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
                                }

                                handlePricingChange(
                                  index,
                                  priceIndex,
                                  'not_working_damaged',
                                  inputValue === '' ? '' : inputValue,
                                );
                              }}
                              onBlur={(e) => {
                                let inputValue = e.target.value;
                                if (inputValue !== '') {
                                  if (inputValue.startsWith('.')) {
                                    inputValue = `0${inputValue}`;
                                  }

                                  const numericValue = parseFloat(inputValue);

                                  handlePricingChange(
                                    index,
                                    priceIndex,
                                    'not_working_damaged',
                                    isNaN(numericValue) ? '' : numericValue,
                                  );
                                }
                              }}
                              value={price.not_working_damaged}
                            />
                          </FormGroup>
                        </PricingContainer>
                      );
                    },
                  )}
                </AccordionContent>
              </AccordionInnerContainer>
            ))}
          </AccordionContainer>
        </FormGroup>
        <FormGroup>
          <FormGroup>
            <AppButton
              type="button"
              variant="outlined"
              width="fit-content"
              onClick={() =>
                setSideModalState({ ...sideModalState, view: 'add-product' })
              }
            >
              Back
            </AppButton>
          </FormGroup>
          <FormGroup>
            <AppButton
              type="button"
              variant="outlined"
              width="fit-content"
              onClick={() => resetForm()}
            >
              Reset
            </AppButton>
            <AppButton
              type="submit"
              width="fit-content"
              disabled={hasEmptyValueInArray(formik.values)}
            >
              Save
            </AppButton>
          </FormGroup>
        </FormGroup>
      </FormContainer>
    </FormWrapper>
  );
}
