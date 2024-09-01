"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import api from "@/appwrite/appwrite";
import {
  Ecog,
  GenderOptions,
  Informed,
  InformedLevel,
  Religion,
  YesNo,
} from "@/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import SectionTitle from "../SectionTitle";
import { SelectItem } from "../ui/select";
import { AddNewInsurance } from "../dialogs/AddNewInsurance";
import { InsuranceProviders } from "@/types/appwrite.types";
import { Query } from "appwrite";

const GuestFormValidation = z.object({
  full_name: z.string().nonempty("El nombre completo es obligatorio"),
  birthdate: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "La fecha de nacimiento es obligatoria",
  }),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  gender: z.enum(["male", "female"]),
  contact_full_name: z
    .string()
    .nonempty("El nombre completo del contacto es obligatorio"),
  contact_email: z.string().email("El email del contacto no es válido"),
  contact_phone_number: z
    .string()
    .nonempty("El número de teléfono de contacto es obligatorio"),
  contact_relationship: z.string().optional(),
  family_genogram: z.string().optional(),
  oncological_disease: z.string().optional(),
  non_oncological_disease: z.string().optional(),
  referring_physician: z.string().optional(),
  primary_care_physician: z.string().optional(),
  health_insurance: z.string().optional(),
  health_insurance_number: z.string().optional(),
  allergies: z.string().optional(),
  current_medication: z.string().optional(),
  family_medical_history: z.string().optional(),
  tumor: z.string().optional(),
  tumor_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), {
      message: "La fecha de diagnóstico es obligatoria",
    })
    .optional(),
  metastasis: z.enum(["yes", "no"]).optional(),
  metastasis_site: z.string().optional(),
  ecog: z
    .enum([
      "Asymptomatic, normal activity",
      "Symptomatic, able to carry out daily activities",
      "Symptomatic, in bed less than 50% of the day",
      "Symptomatic, in bed more than 50% of the day",
      "Symptomatic, in bed all day",
      "Terminal patient",
    ])
    .optional(),
  informed: z
    .enum(["The guest is informed", "The guest is not informed"])
    .optional(),
  informed_level: z
    .enum([
      "Totally, knows the diagnosis and prognosis",
      "Partially, knows the diagnosis but not the prognosis (doesn't know that it is incurable or that they might die)",
    ])
    .optional(),
  religion: z
    .enum([
      "None",
      "Catholic",
      "Jewish",
      "Evangelical",
      "Mormon",
      "Jehovah's Witness",
      "Other",
    ])
    .optional(),
  religion_other: z.string().optional(),
  funeral_service: z.enum(["yes", "no"]).optional(),
  surgery: z.string().optional(),
  rt: z.string().optional(),
  qt: z.string().optional(),
  ht: z.string().optional(),
  opioid_treatment: z.enum(["yes", "no"]).optional(),
  opioid: z.string().optional(),
  non_opioid_treatment: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  admission_date: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "La fecha de admisión es obligatoria",
  }),
});

const AddGuestForm = () => {
  const [submiting, setSubmiting] = useState<boolean | false>(false);
  const [insuranceProviders, setInsuranceProviders] = useState<
    InsuranceProviders[]
  >([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof GuestFormValidation>>({
    resolver: zodResolver(GuestFormValidation),
    defaultValues: {
      full_name: "",
      birthdate: new Date(),
      phone_number: "",
      address: "",
      gender: "male", // Valor predeterminado
      contact_full_name: "",
      contact_email: "",
      contact_phone_number: "",
      contact_relationship: "",
      family_genogram: "",
      oncological_disease: "",
      non_oncological_disease: "",
      referring_physician: "",
      primary_care_physician: "",
      health_insurance: "",
      health_insurance_number: "",
      allergies: "",
      current_medication: "",
      family_medical_history: "",
      tumor: "",
      tumor_date: new Date(),
      metastasis: "no", // Valor predeterminado
      metastasis_site: "",
      ecog: "Asymptomatic, normal activity", // Valor predeterminado
      informed: "The guest is informed", // Valor predeterminado
      informed_level: "Totally, knows the diagnosis and prognosis", // Valor predeterminado
      religion: "None", // Valor predeterminado
      religion_other: "",
      funeral_service: "no", // Valor predeterminado
      surgery: "",
      rt: "",
      qt: "",
      ht: "",
      opioid_treatment: "no", // Valor predeterminado
      opioid: "",
      non_opioid_treatment: "",
      status: "active", // Valor predeterminado
      admission_date: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof GuestFormValidation>) {
    setSubmiting(true);
    try {
      const result = await api.createGuest(data);

      if (result) {
        console.log(JSON.stringify(result));
      }
    } catch (error) {
      console.error("Error durante el envío del formulario:", error);
    } finally {
      setSubmiting(false);
    }
  }

  const updateInsuranceProviders = useCallback(async () => {
    try {
      const insuranceProviders = await api.getAllInsuranceDocuments([
        Query.orderAsc("name"),
      ]);
      setInsuranceProviders(insuranceProviders.documents);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    updateInsuranceProviders();
  }, [updateInsuranceProviders]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          {/* {console.log(form.formState.errors)} */}
          <SectionTitle title="Información personal" />
          <section id="personal-info">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="full_name"
              label="Nombre Completo"
              placeholder="John Doe"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="address"
                label="Dirección"
                placeholder="Av. Falsa 123, Lújan, Buenos Aires"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
              />
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                label="Número de teléfono"
                control={form.control}
                name="phone_number"
                placeholder="+54 9 2323 121212"
              />
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                name="birthdate"
                label="Fecha de Nacimiento"
                placeholder="Selecciona la fecha de nacimiento"
                iconType="calendar"
                iconAlt="Calendar icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
              />
              <CustomFormField
                fieldType={FormFieldType.SKELETON}
                name="gender"
                label="Género"
                placeholder=""
                control={form.control}
                fieldCustomClasses={
                  "w-full border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 gap-6 xl:justify-between w-fit"
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      {GenderOptions.map((option, i) => (
                        <div key={option.id} className="radio-group !w-fit">
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                          />
                          <Label
                            htmlFor={option.value}
                            className="cursor-pointer">
                            {option.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
          </section>
          <SectionTitle title="Información de contacto" />
          <section id="contact-info">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="contact_full_name"
              label="Nombre Completo"
              placeholder="Jane Doe"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="contact_email"
                label="Email"
                placeholder="jane_doe@medicloud-hmt.com"
                iconType="email"
                iconAlt="Email icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
              />
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                label="Número de teléfono"
                control={form.control}
                name="contact_phone_number"
                placeholder="+54 9 2323 121212"
              />
            </div>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="contact_relationship"
              label="Vínculo con el huésped"
              placeholder="ej: Hija"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="family_genogram"
              label="Genograma familiar"
              placeholder=""
              control={form.control}
              fieldCustomClasses={"bg-input-bg-light dark:bg-input-bg-dark"}
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none focus:bg-transparent active:!bg-transparent !bg-transparent border border-main-2 !border-input-border-light dark:!border-input-border-dark"
              }
            />
          </section>
          <SectionTitle title="Información médica" />
          <section id="medical-info">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="oncological_disease"
              label="Enfermedad oncológica"
              placeholder="ej: Cáncer de prostata"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="non_oncological_disease"
              label="Enfermedad no oncológica"
              placeholder="ej: Parkinson"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="referring_physician"
              label="¿Quién lo deriva?"
              placeholder="ej: Dra. María Mónica López"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="primary_care_physician"
              label="Médico de cabecera"
              placeholder="ej: Dra. María Mónica López"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <span className="flex w-full justify-center items-center">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="health_insurance"
                  label="Obra social"
                  iconType="square-activity"
                  iconAlt="Calendar icon"
                  iconLightColor={"#b0b6bf"}
                  iconDarkColor={"#b0b6bf"}
                  placeholder="Seleccione la obra social"
                  control={form.control}
                  fieldCustomClasses={
                    "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                  }
                  inputCustomClasses={
                    "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                  }>
                  {insuranceProviders.map((index, i) => (
                    <SelectItem key={index.$id} value={index.$id}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
                <AddNewInsurance onSuccess={updateInsuranceProviders} />
              </span>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="health_insurance_number"
                label="Número de afiliado"
                placeholder="ej: 0000897652 / 1"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
              />
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="allergies"
                label="Alergias (opcional)"
                placeholder=""
                control={form.control}
                fieldCustomClasses={"bg-input-bg-light dark:bg-input-bg-dark"}
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none focus:bg-transparent active:!bg-transparent !bg-transparent border border-main-2 !border-input-border-light dark:!border-input-border-dark"
                }
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="current_medication"
                label="Medicación actual"
                placeholder=""
                control={form.control}
                fieldCustomClasses={"bg-input-bg-light dark:bg-input-bg-dark"}
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none focus:bg-transparent active:!bg-transparent !bg-transparent border border-main-2 !border-input-border-light dark:!border-input-border-dark"
                }
              />
            </div>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="family_medical_history"
              label="Antecedentes familiares"
              placeholder=""
              control={form.control}
              fieldCustomClasses={"bg-input-bg-light dark:bg-input-bg-dark"}
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none focus:bg-transparent active:!bg-transparent !bg-transparent border border-main-2 !border-input-border-light dark:!border-input-border-dark"
              }
            />
          </section>
          <SectionTitle title="Información sensible" />
          <section id="sensitive-information">
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="informed"
                label="Informado"
                iconType="info"
                iconAlt="Info icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                placeholder="¿El huésped está informado?"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }>
                {Informed.map((level, i) => (
                  <SelectItem key={level.id + i} value={level.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{level.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="informed_level"
                label="Tipo de información"
                iconType="info"
                iconAlt="Info icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                placeholder="¿Cuánto sabe?"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }>
                {InformedLevel.map((level, i) => (
                  <SelectItem key={level.id + i} value={level.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{level.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="religion"
                label="Religión"
                iconType="religion"
                iconAlt="Religion icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                placeholder="¿El huésped tiene religión?"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }>
                {Religion.map((index, i) => (
                  <SelectItem key={index.id + i} value={index.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{index.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="funeral_service"
                label="Servicio funerario"
                iconType="bed"
                iconAlt="Bed icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                placeholder="¿El huésped tiene servicio funerario?"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }>
                {YesNo.map((index, i) => (
                  <SelectItem key={index.id + i} value={index.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{index.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
          </section>
          <SectionTitle title="Información de diagnóstico" />
          <section id="diagnosis-information">
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="tumor"
                label="Tumor"
                placeholder="ej: Tumor en la cabeza"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
              />
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                name="tumor_date"
                label="Fecha de diagnóstico"
                placeholder="Selecciona la fecha de nacimiento"
                iconType="calendar"
                iconAlt="Calendar icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
              />
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="metastasis"
                label="Metástasis"
                iconType="info"
                iconAlt="Info icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                placeholder="¿El túmor hizo metástasis?"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }>
                {YesNo.map((index, i) => (
                  <SelectItem key={index.id + i} value={index.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{index.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="metastasis_site"
                label="Lugar de metástasis"
                placeholder="ej: Cerebro"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
              />
            </div>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="ecog"
              label="ECOG (Escala de capacidad funcional)"
              iconType="info"
              iconAlt="Info icon"
              iconLightColor={"#b0b6bf"}
              iconDarkColor={"#b0b6bf"}
              placeholder="Estado de salud del huésped"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }>
              {Ecog.map((index, i) => (
                <SelectItem key={index.id + i} value={index.value}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{index.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="surgery"
              label="Realizado"
              placeholder="Escribe aquí"
              iconType="surgery"
              iconAlt="Surgery icon"
              iconLightColor={"#b0b6bf"}
              iconDarkColor={"#b0b6bf"}
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="rt"
              // label="RT"
              placeholder="Escribe aquí"
              iconType="rt"
              iconAlt="rt icon"
              iconLightColor={"#b0b6bf"}
              iconDarkColor={"#b0b6bf"}
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="qt"
              // label="QT"
              placeholder="Escribe aquí"
              iconType="qt"
              iconAlt="qt icon"
              iconLightColor={"#b0b6bf"}
              iconDarkColor={"#b0b6bf"}
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="ht"
              // label="HT"
              placeholder="Escribe aquí"
              iconType="ht"
              iconAlt="ht icon"
              iconLightColor={"#b0b6bf"}
              iconDarkColor={"#b0b6bf"}
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="opioid_treatment"
                label="Tratamiento opioide"
                iconType="info"
                iconAlt="Info icon"
                iconLightColor={"#b0b6bf"}
                iconDarkColor={"#b0b6bf"}
                placeholder="¿Está recibiendo tratamiento con opioides?"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }>
                {YesNo.map((index, i) => (
                  <SelectItem key={index.id + i} value={index.value}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{index.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="opioid"
                label="Opioide"
                placeholder="ej: Morfina"
                control={form.control}
                fieldCustomClasses={
                  "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
                }
                inputCustomClasses={
                  "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
                }
              />
            </div>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="non_opioid_treatment"
              label="Tratamiento no opioide"
              placeholder=""
              control={form.control}
              fieldCustomClasses={"bg-input-bg-light dark:bg-input-bg-dark"}
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none focus:bg-transparent active:!bg-transparent !bg-transparent border border-main-2 !border-input-border-light dark:!border-input-border-dark"
              }
            />
          </section>
          {Object.keys(form.formState.errors).length > 0 && (
            <div className="border border-red-800 bg-red-300 text-red-800 rounded-md p-2">
              <span>
                <ul>
                  {Object.entries(form.formState.errors).map(([key, error]) => (
                    <li key={key}>{error.message}</li>
                  ))}
                </ul>
              </span>
            </div>
          )}
          <Button
            className="text-color-dark dark:text-color-light bg-button-bg-dark dark:bg-button-bg-light hover:bg-button-hover-dark dark:hover:bg-button-hover-light w-full mt-[30px]"
            type="submit"
            disabled={submiting}>
            {submiting ? "Cargando..." : "Agregar"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddGuestForm;
