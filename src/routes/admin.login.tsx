import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { FormError } from "@/components/admin/form-error";
import { AdminLogo } from "@/components/logo/logo-admin";
import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/form";
import { signIn } from "@/lib/server/auth";

export const Route = createFileRoute("/admin/login")({ component: LoginPage });

function LoginPage() {
	const navigate = useNavigate();
	const login = useServerFn(signIn);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setLoading(true);
		const values = new FormData(event.currentTarget);
		try {
			await login({ data: { email: String(values.get("email")), password: String(values.get("password")) } });
			await navigate({ to: "/admin" });
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "No se pudo iniciar sesión");
			setLoading(false);
		}
	};
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-8 py-20">
			<div
				aria-hidden
				className="-translate-x-1/2 pointer-events-none absolute top-[-20rem] left-1/2 size-[70rem] rounded-full bg-primary-500/10 blur-[120px]"
			/>
			<div className="relative w-full max-w-[44rem]">
				<AdminLogo />
				<form
					onSubmit={submit}
					className="flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-neutral-600 p-12"
				>
					<div className="mb-2">
						<h1 className="font-bold text-lg text-text-base">Administración</h1>
						<p className="mt-2 text-sm text-text-light">Ingresa tus credenciales para continuar.</p>
					</div>
					<Input
						name="email"
						type="email"
						label="Email"
						required
						autoFocus
						autoComplete="email"
						placeholder="admin@luckyshoes.com"
						fullWidth
					/>
					<Input
						name="password"
						type="password"
						label="Contraseña"
						required
						autoComplete="current-password"
						placeholder="••••••••"
						fullWidth
					/>
					{error && <FormError message={error} />}
					<Button
						title={loading ? "Ingresando…" : "Ingresar"}
						type="submit"
						disabled={loading}
						className="mt-4 w-full"
					/>
				</form>
				<p className="mt-8 text-center text-text-extra-light text-xs">Acceso restringido al equipo de Lucky Shoes.</p>
			</div>
		</main>
	);
}
