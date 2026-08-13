import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { signIn } from "@/lib/server/auth";

export const Route = createFileRoute("/admin/login")({ component: LoginPage });
function LoginPage() {
	const navigate = useNavigate();
	const login = useServerFn(signIn);
	const [error, setError] = useState("");
	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const values = new FormData(event.currentTarget);
		try {
			await login({ data: { email: String(values.get("email")), password: String(values.get("password")) } });
			await navigate({ to: "/admin" });
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "No se pudo iniciar sesión");
		}
	};
	return (
		<main className="mx-auto flex min-h-screen max-w-md items-center">
			<form onSubmit={submit} className="flex w-full flex-col gap-4 rounded-xl border p-8">
				<h1 className="font-bold text-2xl">Administración</h1>
				<input name="email" type="email" required placeholder="Email" className="rounded border p-3" />
				<input name="password" type="password" required placeholder="Contraseña" className="rounded border p-3" />
				{error && <p className="text-red-400">{error}</p>}
				<button className="rounded bg-primary p-3" type="submit">
					Ingresar
				</button>
			</form>
		</main>
	);
}
