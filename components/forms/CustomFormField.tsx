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
import { FormFieldType } from "./LoginForm";
import Image from "next/image";
import Icon from "../icons/Icon";

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
  iconColor?: string;
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
    iconColor,
    iconType,
  } = props;
  switch (fieldType) {
    case FormFieldType.PASSWORD:
    case FormFieldType.INPUT:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } rounded-md ${fieldCustomClasses}`}>
          ​
          {iconType && (
            <Icon
              icon={iconType}
              strokeColor={iconColor ? iconColor : "currentColor"}
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
        <FormItem className={formItemCustomClasses}>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className={`${labelCustomClasses} text-white`}>
              {label}
            </FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
