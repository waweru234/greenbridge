import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, Record<string, unknown>>;

export function useSiteContent() {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_content")
      .select("key, value")
      .then(({ data }) => {
        if (cancelled) return;
        const map: ContentMap = {};
        for (const row of data ?? []) {
          map[row.key] = (row.value as Record<string, unknown>) ?? {};
        }
        setContent(map);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function get<T = string>(key: string, field: string, fallback: T): T {
    const v = content[key]?.[field];
    return (v as T) ?? fallback;
  }

  return { content, loading, get };
}

export interface ServiceRow {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}
export interface ProjectRow {
  id: string;
  title: string;
  location: string;
  capacity: string | null;
  description: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}
export interface TestimonialRow {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatar_url: string | null;
  sort_order: number;
  is_active: boolean;
}
export interface CertificationRow {
  id: string;
  name: string;
  issuer: string;
  status: "in_progress" | "achieved" | "planned";
  year: string | null;
  logo_url: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export function useServices() {
  const [data, setData] = useState<ServiceRow[]>([]);
  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setData((data ?? []) as ServiceRow[]));
  }, []);
  return data;
}

export function useProjects() {
  const [data, setData] = useState<ProjectRow[]>([]);
  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setData((data ?? []) as ProjectRow[]));
  }, []);
  return data;
}

export function useTestimonials() {
  const [data, setData] = useState<TestimonialRow[]>([]);
  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setData((data ?? []) as TestimonialRow[]));
  }, []);
  return data;
}

export function useCertifications() {
  const [data, setData] = useState<CertificationRow[]>([]);
  useEffect(() => {
    supabase
      .from("certifications")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setData((data ?? []) as CertificationRow[]));
  }, []);
  return data;
}
