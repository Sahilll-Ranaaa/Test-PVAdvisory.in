"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export default function EngageUsForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      
      if (supabase) {
        const { error } = await supabase.from('PvAdvisoryLeadData').insert([{
          name: values.name,
          email: values.email,
          mobile: values.phone,
          activity_title: "Direct Engagement",
          activity_type: "Engage Us",
          metadata: {
            message: values.message,
            source: 'Engage Us Form'
          }
        }]);

        if (error) throw error;
      }

      setLoading(false);
      alert("Message sent successfully!");
      form.reset();
    } catch (error) {
      setLoading(false);
      console.error("Form submission error", error);
      alert("An error occurred while submitting the form.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  type="text"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@company.com"
                  type="email"
                  {...field}
                  className="bg-white"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  placeholder="+1(555) 000-0000"
                  {...field}
                  defaultCountry="IN"
                  className="bg-white rounded-lg"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Leave us a Message"
                  className="resize-none bg-white"
                  rows={4}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : null}
          Send Message
        </Button>
      </form>
    </Form>
  );
}
