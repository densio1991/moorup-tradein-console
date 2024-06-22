import { capitalize, get, isEmpty } from "lodash";

export const extractInitialValue = (template: any[] = []) => {
  let initialValue: any = {};

  template.forEach((section) => {
    const sectionData: any = {};
    const sectionList: any[] = [];
    section?.content?.forEach((field: any, idx: number) => {
      if (field.label) {
        sectionData[field.label] = field.value;
      } else {
        sectionList.push(field.value);
      }
    });

    initialValue[section.field] = !isEmpty(sectionData) ? sectionData : sectionList;
  })

  // console.log({initialValue});

  return initialValue;
}

export const parseTemplateValue = (template: any[], formValues: any) => {
  let templateValue: any = [...template];

  templateValue.map((section: any) => {
    section.content = section?.content?.map((field: any, idx: number) => {
      const fieldId = field.label
          ? `${section.field}.${field.label}`
          : `${section.field}[${idx}]`;

      field.value = get(formValues, fieldId);

      return field;
    });

    return section;
  })

  console.log({templateValue});

  return templateValue;
}

export const formatToReadable = (title: string = "") => {
  return capitalize(title?.replace(/[_-]/g, " "));
}