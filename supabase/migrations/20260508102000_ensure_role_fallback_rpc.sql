-- Fallback role bootstrap: ensures every authenticated user can be assigned
-- a default non-admin role even if auth trigger setup is missing in an environment.
CREATE OR REPLACE FUNCTION public.ensure_current_user_default_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_user_id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.ensure_current_user_default_role() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ensure_current_user_default_role() TO authenticated;
