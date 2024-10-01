/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female";
declare type Metastasis = "yes" | "no";
declare type Ecog =
  | "Asymptomatic, normal activity"
  | "Symptomatic, able to carry out daily activities"
  | "Symptomatic, in bed less than 50% of the day"
  | "Symptomatic, in bed more than 50% of the day"
  | "Symptomatic, in bed all day"
  | "Terminal patient";
declare type Informed = "The guest is informed" | "The guest is not informed";
declare type Informed_Level =
  | "Uninformed"
  | "Totally, knows the diagnosis and prognosis"
  | "Partially, knows the diagnosis but not the prognosis (doesn't know that it is incurable or that they might die)";
declare type Not_informed_Level =
  | "Not told"
  | "Family doesn't want them to know"
  | "Doesn't ask"
  | "Patient doesn't want to know"
  | "Not in a condition to receive the information";

declare type Religion =
  | "None"
  | "Catholic"
  | "Jewish"
  | "Evangelical"
  | "Mormon"
  | "Jehovah's Witness"
  | "Other";

declare type Funeral_Service = "yes" | "no";
declare type Opioid_Treatment = "yes" | "no";
declare type Status = "active" | "pending" | "inactive";

declare interface CreateUserParams {
  // full_name: string;
  email: string;
}

declare interface LoginParams {
  // full_name: string;
  email: string;
  password: string;
}

declare interface User extends CreateUserParams {
  $id: string;
}
