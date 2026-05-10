-- =========================================================
-- SITE VISITS (traffic analytics)
-- =========================================================
CREATE TABLE public.site_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  session_id TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_site_visits_created_at ON public.site_visits (created_at DESC);
CREATE INDEX idx_site_visits_session_id ON public.site_visits (session_id);

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert site visits"
  ON public.site_visits FOR INSERT
  WITH CHECK (
    char_length(page_path) BETWEEN 1 AND 300
    AND char_length(session_id) BETWEEN 8 AND 120
  );

CREATE POLICY "Admins can read site visits"
  ON public.site_visits FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
