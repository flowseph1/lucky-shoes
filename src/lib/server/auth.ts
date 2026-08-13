import { createClient } from "@supabase/supabase-js";
import { redirect } from "@tanstack/react-router";
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { z } from "zod";

const cookieName = "lucky-shoes-access-token";
const credentials = z.object({ email: z.string().email(), password: z.string().min(8) });

function config() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_ANON_KEY;
	if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be configured");
	return { url, key };
}

export const getAccessToken = createServerOnlyFn(async () => {
	const { getRequestHeader } = await import("@tanstack/react-start/server");
	const cookie = getRequestHeader("cookie") ?? "";
	return cookie
		.split(";")
		.map((part) => part.trim())
		.find((part) => part.startsWith(`${cookieName}=`))
		?.slice(cookieName.length + 1);
});

export const requireAdmin = createServerOnlyFn(async () => {
	const token = await getAccessToken();
	if (!token) throw redirect({ to: "/admin/login" });
	const { url, key } = config();
	const supabase = createClient(url, key, { global: { headers: { Authorization: `Bearer ${token}` } } });
	const {
		data: { user },
	} = await supabase.auth.getUser(token);
	if (!user) throw redirect({ to: "/admin/login" });
	const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
	if (profile?.role !== "admin") throw redirect({ to: "/admin/login" });
	return user;
});

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
	const user = await requireAdmin();
	return { id: user.id, email: user.email ?? "" };
});

export const signIn = createServerFn({ method: "POST" })
	.validator(credentials)
	.handler(async ({ data }) => {
		const { url, key } = config();
		const supabase = createClient(url, key);
		const { data: session, error } = await supabase.auth.signInWithPassword(data);
		if (error || !session.session) throw new Error("Invalid email or password");
		const { setResponseHeader } = await import("@tanstack/react-start/server");
		setResponseHeader(
			"Set-Cookie",
			`${cookieName}=${session.session.access_token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${session.session.expires_in}`,
		);
		return { ok: true };
	});

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
	const { setResponseHeader } = await import("@tanstack/react-start/server");
	setResponseHeader("Set-Cookie", `${cookieName}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`);
	return { ok: true };
});
