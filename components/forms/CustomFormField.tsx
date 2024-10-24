"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { E164Number } from "libphonenumber-js/core";
import React from "react";
import DatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import Icon from "../icons/Icon";

import { FocusEvent } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export enum FormFieldType {
  INPUT = "input",
  NUMBER = "number",
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
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  value?: string;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    onFocus,
    onBlur,
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
    value,
  } = props;
  switch (fieldType) {
    case FormFieldType.PASSWORD:
    case FormFieldType.INPUT:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}
        >
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
              onFocus={onFocus}
              onBlur={onBlur}
              value={value}
              className={`shad-input ${inputCustomClasses}`}
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.NUMBER:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}
        >
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
              valueasnumber="true"
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
          } overflow-hidden rounded-md ${fieldCustomClasses}`}
        >
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

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="AR"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    case FormFieldType.TEXTAREA:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}
        >
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              {...field}
              className={`shad-textArea ${inputCustomClasses}`}
              disabled={props.disabled}
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.SELECT:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}
        >
          ​
          {iconType && (
            <Icon
              icon={iconType}
              iconLightColor={iconLightColor ? iconLightColor : "currentColor"}
              iconDarkColor={iconDarkColor ? iconDarkColor : "currentColor"}
            />
          )}
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="shad-select-content w-full">
                {props.children}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, formItemCustomClasses, labelCustomClasses } =
    props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`!mb-[30px] w-full ${formItemCustomClasses}`}>
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel
              className={`${labelCustomClasses} text-color-light dark:text-color-dark`}
            >
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
