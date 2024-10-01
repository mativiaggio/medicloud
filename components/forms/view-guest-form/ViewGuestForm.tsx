"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import {
  Ecog,
  GenderOptions,
  Informed,
  InformedLevel,
  Religion,
  YesNo,
} from "@/constants";
import { GuestFormValidation } from "@/constants/zod.index";
import { useGuest } from "@/context/GuestContext";
import api from "@/lib/appwrite";
import { InsuranceProviders } from "@/types/appwrite.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Query } from "appwrite";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddNewInsurance } from "../../dialogs/AddNewInsurance";
import SectionTitle from "../../SectionTitle";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { SelectItem } from "../../ui/select";
import CustomFormField, { FormFieldType } from "../CustomFormField";

const ViewGuestForm = () => {
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [insuranceProviders, setInsuranceProviders] = useState<
    InsuranceProviders[]
  >([]);

  const { guest, guestLoading } = useGuest(); // Get guest and loading status from the context

  const form = useForm<z.infer<typeof GuestFormValidation>>({
    resolver: zodResolver(GuestFormValidation),
    defaultValues: {
      full_name: guest?.full_name || "",
      birthdate: guest?.birthdate ? new Date(guest.birthdate) : new Date(),
      phone_number: guest?.phone_number || "",
      address: guest?.address || "",
      gender: guest?.gender || "male",
      contact_full_name: guest?.contact_full_name || "",
      contact_email: guest?.contact_email || "",
      contact_phone_number: guest?.contact_phone_number || "",
      contact_relationship: guest?.contact_relationship || "",
      family_genogram: guest?.family_genogram || "",
      oncological_disease: guest?.oncological_disease || "",
      non_oncological_disease: guest?.non_oncological_disease || "",
      referring_physician: guest?.referring_physician || "",
      primary_care_physician: guest?.primary_care_physician || "",
      insuranceProvider: guest?.insuranceProvider?.$id || "",
      health_insurance_number: guest?.health_insurance_number || "",
      allergies: guest?.allergies || "",
      current_medication: guest?.current_medication || "",
      family_medical_history: guest?.family_medical_history || "",
      tumor: guest?.tumor || "",
      tumor_date: guest?.tumor_date ? new Date(guest.tumor_date) : new Date(),
      metastasis: guest?.metastasis || "no",
      metastasis_site: guest?.metastasis_site || "",
      ecog: guest?.ecog || "Asymptomatic, normal activity",
      informed: guest?.informed || "The guest is informed",
      informed_level: guest?.informed_level || "Uninformed",
      religion: guest?.religion || "None",
      religion_other: guest?.religion_other || "",
      funeral_service: guest?.funeral_service || "no",
      surgery: guest?.surgery || "",
      rt: guest?.rt || "",
      qt: guest?.qt || "",
      ht: guest?.ht || "",
      opioid_treatment: guest?.opioid_treatment || "no",
      opioid: guest?.opioid || "",
      non_opioid_treatment: guest?.non_opioid_treatment || "",
      status: guest?.status || "active",
      admission_date: guest?.admission_date
        ? new Date(guest.admission_date)
        : new Date(),
    },
  });

  console.log("guest informed level: " + guest?.informed_level);

  async function onSubmit(data: z.infer<typeof GuestFormValidation>) {
    setSubmiting(true);
    try {
      const result = await api.guest.update(guest?.$id || "", data);
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error durante el envío del formulario:", error);
    } finally {
      setSubmiting(false);
    }
  }

  const updateInsuranceProviders = useCallback(async () => {
    try {
      const insuranceProviders = await api.insuranceProvider.getAll([
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

  if (guestLoading) {
    return <div>Cargando información del huésped...</div>;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                      className="flex h-11 w-fit gap-6 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {GenderOptions.map((option, i) => (
                        <div key={option.id} className="radio-group !w-fit">
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                          />
                          <Label
                            htmlFor={option.value}
                            className="cursor-pointer"
                          >
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
              <span className="flex w-full items-center justify-center">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="insuranceProvider"
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
                  }
                >
                  {insuranceProviders.map((index, i) => (
                    <SelectItem key={index.$id} value={index.$id}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p>{index.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
                <AddNewInsurance
                  className="ml-1 mt-[2px] aspect-square h-[45px] !bg-transparent p-0 ring-1 !ring-input-border-light dark:!ring-input-border-dark"
                  onSuccess={updateInsuranceProviders}
                />
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
                }
              >
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
                }
              >
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
                }
              >
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
                }
              >
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
                }
              >
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
              }
            >
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
                }
              >
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
            <div className="rounded-md border border-red-800 bg-red-300 p-2 text-red-800">
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
            className="mt-[30px] w-full bg-button-bg-dark text-color-dark hover:bg-button-hover-dark dark:bg-button-bg-light dark:text-color-light dark:hover:bg-button-hover-light"
            type="submit"
            disabled={submiting}
          >
            {submiting ? "Cargando..." : "Guardar cambios"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ViewGuestForm;
