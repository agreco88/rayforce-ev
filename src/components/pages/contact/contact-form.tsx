"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { AnimatedField } from "@/components/inputs/animated-field";

/* -------------- Schema -------------- */

const phoneRegex = /^(\+?[0-9\s\-().]{7,20})$/;

function makeSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    name: z
      .string()
      .min(1, t("errors.firstName"))
      .min(2, t("errors.firstName")),
    email: z.email(t("errors.email")),
    phone: z
      .string()
      .optional()
      .refine((v) => !v || phoneRegex.test(v), t("errors.phone")),
    message: z.string().min(10, t("errors.message")),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof makeSchema>>;

/* -------------- Component -------------- */

export default function ContactForm() {
  const t = useTranslations("ContactPage.ContactForm");
  const schema = makeSchema(t);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Simulate async submit
    await new Promise((res) => setTimeout(res, 900));
    console.log("Submitted values: ", values);
    toast.success(t("success.title"), {
      description: t("success.description"),
      position: "bottom-center",
    });
    form.reset();
  };

  const { isSubmitting, errors } = form.formState;

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        variants={waterfallList}
        initial="hidden"
        animate="show"
        className="container mx-auto flex w-full max-w-lg  flex-col gap-6 bg-secondary rounded px-4 py-8 md:p-8 divide-y"
      >
        <motion.div variants={waterfallItem}>
          <AnimatedField
            control={form.control}
            name={"name"}
            label={t("firstName")}
            placeholder={t("placeholders.firstName")}
            errorMsg={errors.name?.message}
          />
        </motion.div>

        <motion.div variants={waterfallItem}>
          <AnimatedField
            control={form.control}
            name={"email"}
            type="email"
            label={t("email")}
            placeholder={t("placeholders.email")}
            errorMsg={errors.email?.message}
          />
        </motion.div>

        <motion.div variants={waterfallItem}>
          <AnimatedField
            control={form.control}
            name={"phone"}
            type="tel"
            label={`${t("phone")} (${t("optional")})`}
            placeholder={t("placeholders.phone")}
            errorMsg={errors.phone?.message}
          />
        </motion.div>

        <motion.div variants={waterfallItem}>
          <AnimatedField
            control={form.control}
            name={"message"}
            area
            label={t("message")}
            placeholder={t("placeholders.message")}
            errorMsg={errors.message?.message}
          />
        </motion.div>

        <motion.div variants={waterfallItem}>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("sending") : t("sendMessage")}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
}
