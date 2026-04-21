-- =========================================================
-- ROLES (separate table to prevent privilege escalation)
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- TIMESTAMP TRIGGER
-- =========================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================================================
-- SITE CONTENT (key/value JSON store)
-- =========================================================
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read content"
  ON public.site_content FOR SELECT USING (true);

CREATE POLICY "Admins manage content"
  ON public.site_content FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_site_content_updated
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- SERVICES
-- =========================================================
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sun',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read services"
  ON public.services FOR SELECT USING (true);

CREATE POLICY "Admins manage services"
  ON public.services FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_services_updated
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- PROJECTS
-- =========================================================
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity TEXT,
  description TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read projects"
  ON public.projects FOR SELECT USING (true);

CREATE POLICY "Admins manage projects"
  ON public.projects FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_projects_updated
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- TESTIMONIALS
-- =========================================================
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read testimonials"
  ON public.testimonials FOR SELECT USING (true);

CREATE POLICY "Admins manage testimonials"
  ON public.testimonials FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_testimonials_updated
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- CERTIFICATIONS
-- =========================================================
CREATE TYPE public.cert_status AS ENUM ('in_progress', 'achieved', 'planned');

CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  status public.cert_status NOT NULL DEFAULT 'in_progress',
  year TEXT,
  logo_url TEXT,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read certifications"
  ON public.certifications FOR SELECT USING (true);

CREATE POLICY "Admins manage certifications"
  ON public.certifications FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_certifications_updated
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- MESSAGES (contact form submissions)
-- =========================================================
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 5 AND 255
    AND char_length(message) BETWEEN 10 AND 2000
  );

CREATE POLICY "Admins read messages"
  ON public.messages FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update messages"
  ON public.messages FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete messages"
  ON public.messages FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- SEED DATA
-- =========================================================
INSERT INTO public.site_content (key, value) VALUES
  ('about', '{"heading":"A bridge built from sun, wind & purpose.","story1":"Greenbridge Energy Limited is a renewable energy company connecting British engineering excellence with Africa''s vast solar and wind potential — accelerating the journey to a zero-carbon future on both continents.","story2":"Founded by engineers who saw two worlds — one rich in clean-tech know-how, the other rich in untapped renewable potential — Greenbridge exists to close that gap. We work hand-in-hand with local communities, governments and industrial partners to deliver renewable systems that don''t just generate megawatts, but generate jobs, savings and lasting change."}'),
  ('mission', '{"text":"To accelerate the global energy transition by delivering reliable, affordable renewable solutions across the UK and Africa."}'),
  ('vision', '{"text":"A world where every home, business and community is powered by clean, abundant, locally-generated energy."}'),
  ('values', '{"items":["Integrity in engineering","Respect for community","Relentless focus on long-term, measurable impact","Sustainability at every step","Local partnership and shared prosperity"]}'),
  ('contact', '{"email":"hello@greenbridge-energy.com","uk_phone":"+44 20 0000 0000","kenya_phone":"+254 700 000 000","uk_office":"London, United Kingdom","kenya_office":"Nairobi, Kenya","whatsapp":"254700000000"}');

INSERT INTO public.services (title, description, icon, sort_order) VALUES
  ('Solar PV Systems', 'Utility-scale farms, commercial rooftops and off-grid kits engineered for African sun and UK climate.', 'Sun', 1),
  ('Wind & Hybrid', 'Wind turbines and hybrid solar-wind installations with intelligent storage for 24/7 reliability.', 'Wind', 2),
  ('Grid & Storage', 'Battery storage, microgrids and grid-tie engineering that keeps the lights on, sustainably.', 'Zap', 3),
  ('Microgrids & Smart Grid', 'Intelligent microgrids for villages, campuses and industrial sites with real-time monitoring.', 'Cpu', 4),
  ('EPC & Installation', 'End-to-end Engineering, Procurement and Construction. On-time, on-budget, on-spec.', 'HardHat', 5),
  ('Energy Advisory', 'Feasibility studies, financial modelling and carbon strategy for governments and corporates.', 'LineChart', 6);

INSERT INTO public.projects (title, location, capacity, description, sort_order) VALUES
  ('Naivasha Solar Farm', 'Naivasha, Kenya', '45 MW', 'A utility-scale solar farm powering over 30,000 homes and feeding clean energy into Kenya''s national grid.', 1),
  ('Pennine Wind Cluster', 'Yorkshire, UK', '62 MW', 'Six high-efficiency turbines on the Pennine ridge, delivering reliable wind power into the UK grid year-round.', 2),
  ('Industrial Rooftop Programme', 'Nairobi, Kenya', '8.5 MW', 'Rooftop solar across 14 manufacturing plants, cutting energy bills by an average of 38%.', 3);

INSERT INTO public.testimonials (name, role, company, quote, sort_order) VALUES
  ('Amina Otieno', 'Operations Director', 'East Africa Cement', 'Greenbridge cut our grid dependence by half in under a year. Pure professionalism.', 1),
  ('James Holloway', 'Chief Sustainability Officer', 'Pennine Industries', 'Engineering excellence meets real environmental impact. Exactly the partner we needed.', 2);

INSERT INTO public.certifications (name, issuer, status, year, description, sort_order) VALUES
  ('ISO 9001 — Quality Management', 'International Organization for Standardization', 'in_progress', '2025', 'Implementing systematic quality management across all engineering operations.', 1),
  ('ISO 14001 — Environmental Management', 'International Organization for Standardization', 'in_progress', '2025', 'Formalising our environmental management framework across UK & Kenya operations.', 2),
  ('IEC 61730 — PV Module Safety', 'International Electrotechnical Commission', 'achieved', '2024', 'Compliance with global safety standards for photovoltaic modules.', 3),
  ('MCS Certification', 'Microgeneration Certification Scheme (UK)', 'achieved', '2024', 'Certified installer for small-scale renewable technology in the UK.', 4),
  ('NEMA EPC Licence', 'National Environment Management Authority (Kenya)', 'achieved', '2024', 'Licensed to deliver Engineering, Procurement & Construction projects in Kenya.', 5),
  ('B Corp Certification', 'B Lab', 'planned', '2026', 'Pursuing certification as a Benefit Corporation for verified social and environmental performance.', 6);
