"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Icon from "../icons/Icon";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  formItemCustomClasses?: string;
  iconType?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  fieldCustomClasses?: string;
  inputCustomClasses?: string;
  labelCustomClasses?: string;
  iconCustomClasses?: string;
  iconLightColor?: string;
  iconDarkColor?: string;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    iconAlt,
    fieldCustomClasses,
    inputCustomClasses,
    iconCustomClasses,
    iconLightColor,
    iconDarkColor,
    iconType,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;
  switch (fieldType) {
    case FormFieldType.PASSWORD:
    case FormFieldType.INPUT:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } rounded-md  overflow-hidden ${fieldCustomClasses}`}>
          ​
          {iconType && (
            <Icon
              icon={iconType}
              iconLightColor={iconLightColor ? iconLightColor : "currentColor"}
              iconDarkColor={iconDarkColor ? iconDarkColor : "currentColor"}
            />
          )}
          <FormControl>
            <Input
              {...field}
              type={fieldType}
              placeholder={placeholder}
              className={`shad-input ${inputCustomClasses}`}
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.DATE_PICKER:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } rounded-md  overflow-hidden ${fieldCustomClasses}`}>
          ​
          {iconType && (
            <Icon
              icon={iconType}
              iconLightColor={iconLightColor ? iconLightColor : "currentColor"}
              iconDarkColor={iconDarkColor ? iconDarkColor : "currentColor"}
            />
          )}
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "dd/MM/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              placeholderText={"Selecciona la fecha de nacimiento"}
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    formItemCustomClasses,
    iconType,
    iconAlt,
    fieldCustomClasses,
    labelCustomClasses,
  } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${formItemCustomClasses} text-color-dark`}>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className={`${labelCustomClasses}`}>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
